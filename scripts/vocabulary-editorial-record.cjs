// Hydrate explicitly authored selections before assembly. This never approves a record.
const assert=require('assert');
const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
const {POLICY_ID}=require('./vocabulary-review-policy.cjs');
const copy=v=>JSON.parse(JSON.stringify(v));
function hydrate(packet,findings) {
  assert(Array.isArray(findings.entries),'Explicit entry findings required');
  return {version:3,reviews:findings.entries.map(f=>{
    const row=packet.entries.find(e=>e.id===f.id);assert(row,'Finding outside packet');
    const old=project(row.content),replacement=copy(f.replacement||{}),next={...old,...replacement};
    const evidence=(f.dictionary||[]).map(selection=>{
      const source=row.researchPacket.dictionary;
      const match=source.matches.find(m=>m.sequence===selection.sequence);assert(match,'Selected dictionary entry absent');
      const senses=selection.senses.map(n=>{const s=match.senses.find(s=>s.sense===n);assert(s,'Selected dictionary sense absent');return s;});
      assert(senses.length&&selection.finding,'Explicit dictionary sense finding required');
      return {source:source.source,version:'Gzip SHA256 '+source.sha256,
        locator:`ent_seq=${match.sequence}; spelling=${match.spelling}; reading=${match.reading}; senses=${selection.senses.join(',')}`,
        attribution:source.attribution,finding:selection.finding,selected:{...copy(match),senses:copy(senses)}};
    });
    const base={id:f.id,revisionId:f.revisionId,state:f.state||'accepted',
      predecessorHash:row.sourceHash,predecessorRevisionHash:row.predecessorRevisionHash,
      originalHash:row.sourceHash,rationale:f.rationale};
    if(base.state!=='accepted') return {...base,original:{},replacement:{},research:evidence.concat(f.research||[]),openQuestions:f.openQuestions};
    assert(f.review&&f.pitch&&f.risk,'Explicit review, pitch investigation and risk required');
    const review={...(findings.reviewDefaults||{}),...f.review};
    const source=row.researchPacket.pitch;
    const pitchEvidence=f.pitch.evidence||f.pitch.selections?.map(selection=>{
      const rows=selection.locators.map(locator=>{const m=source.matches.find(m=>m.locator===locator);assert(m,'Selected pitch row absent');return m;});
      assert(rows.length&&selection.finding&&selection.sense,'Explicit pitch form/sense finding required');
      assert(selection.patterns.every(p=>rows.some(r=>r.aType.split(',').includes(String(p)))),'Pitch pattern absent from selected rows');
      return {source:source.source,version:source.version+'; sys.dic SHA256 '+source.sha256,
        locator:'https://clrd.ninjal.ac.jp/unidic_archive/2512/unidic-cwj-202512.zip#'+selection.locators.join(','),
        attribution:source.attribution,patterns:selection.patterns,finding:selection.finding,
        match:{word:next.word,reading:next.reading,grammaticalForm:rows.map(r=>r.pos.join('/')+'; '+r.cType+'; '+r.cForm).join(' | '),sense:selection.sense}};
    });
    assert(pitchEvidence?.length,'Pitch evidence required');
    if(f.pitch.status==='verified') replacement.pitchProvenance=copy(pitchEvidence);
    const final={...old,...replacement};
    const policy={id:POLICY_ID,risk:f.risk,reasons:f.reasons||[],enrichmentRequired:f.enrichmentRequired===true,sampled:false};
    if(f.germanEdit) {
      let accepted=old;
      if(Object.hasOwn(row,'acceptedContent')) {
        assert(row.acceptedContent,'German edit exemption requires an accepted baseline');
        accepted=project(row.acceptedContent);
        assert.equal(row.acceptedContentHash,hash(accepted),'Accepted baseline hash differs from packet');
      } else assert(!row.predecessorRevisionHash || row.state==='accepted',
        'German edit of a prior draft requires the accepted baseline in its packet');
      policy.germanEdit={...f.germanEdit,beforeHash:hash(accepted),afterHash:hash(project(final))};
    }
    return {...base,original:Object.fromEntries(Object.keys(replacement).map(k=>[k,Object.hasOwn(old,k)?copy(old[k]):null])),replacement,
      evidence:evidence.concat(f.evidence||[]),policy,review:copy(review),pitch:{status:f.pitch.status,rationale:f.pitch.rationale,evidence:copy(pitchEvidence)}};
  }),decisions:copy(findings.decisions||[])};
}
module.exports={hydrate};
