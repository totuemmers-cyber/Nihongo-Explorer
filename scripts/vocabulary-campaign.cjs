// Advance only after real runtime/ledger validation and all earlier phase gates pass.
const fs=require('fs'),path=require('path'),assert=require('assert');
const {root,read,loadVocabulary}=require('./vocabulary-tools.cjs');
const {prepare,report}=require('./import-vocabulary-completion.cjs');
const {hash}=require('./vocabulary-correction-pipeline.cjs');
const {phaseReports}=require('./vocabulary-phase-report.cjs');
function advanceCampaign(status,plan,now=new Date().toISOString()) {
  const next=JSON.parse(JSON.stringify(status)),campaign=next.activeCampaign;
  assert(campaign?.status==='active','No active full-enrichment campaign');
  const phases=phaseReports(plan),position=campaign.levelOrder.indexOf(campaign.activeLevel);
  assert(position>=0,'Unknown active campaign level');
  for(const level of campaign.levelOrder.slice(0,position+1))assert(phases[level].complete,level+' phase remains open; see live vocabulary coverage');
  campaign.phases[campaign.activeLevel]={...campaign.phases[campaign.activeLevel],status:'complete',completedAt:now,result:phases[campaign.activeLevel]};
  if(position===campaign.levelOrder.length-1){
    assert(report(plan).strictComplete,'Global strict vocabulary enrichment remains open');
    campaign.status='complete';campaign.completedAt=now;campaign.activeLevel=null;
  }else{
    campaign.activeLevel=campaign.levelOrder[position+1];campaign.phases[campaign.activeLevel].status='active';
  }
  return next;
}
module.exports={advanceCampaign};
if(require.main===module){
  assert.equal(process.argv[2],'advance','Use advance [--dry-run]');
  const statusFile='scripts/vocabulary-completion/campaign-status.json',status=JSON.parse(read(statusFile));
  const baseline=JSON.parse(read(status.activeCampaign.baseline));
  assert.equal(hash(baseline),status.activeCampaign.baselineHash,'Campaign baseline changed');
  const plan=prepare();
  assert.equal(JSON.stringify(loadVocabulary().items),JSON.stringify(plan.items),'Committed runtime differs from authoring');
  assert.equal(read('scripts/vocabulary-completion/ledger.json'),plan.files['scripts/vocabulary-completion/ledger.json'],'Committed ledger is stale');
  const next=advanceCampaign(status,plan);
  if(!process.argv.includes('--dry-run'))fs.writeFileSync(path.join(root,statusFile),JSON.stringify(next,null,2)+'\n');
  console.log(JSON.stringify(next.activeCampaign,null,2));
}
