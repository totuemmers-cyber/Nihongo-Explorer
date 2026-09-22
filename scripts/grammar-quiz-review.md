# Grammar quiz answer review

grammar-quiz-review.json is the authored source for graded cloze questions.
It contains one question for each of the 671 cloze-bearing patterns:
N5 76, N4 140, N3 134, N2 131, N1 190. The two existing metalinguistic
exclusions remain excluded. Other reference examples stay available for study.

Each record binds to the pattern ID, example index, level, Japanese sentence,
German meaning, and exact blank span. All 216 N5/N4 records include an explicit
kana prompt. This restores the 86 beginner patterns whose first annotated
examples could not pass the old automatic prompt conversion.

The canonical answer must be in acceptedAnswers. Additional accepted forms
are exclusions: they must never appear as wrong choices. This list is not an
exhaustive grammar dictionary. Each of the three distractors has its own
German rationale. Choose distractors that conflict with the supplied meaning
or have a specific formation error. In particular, interchangeable particles
such as に/へ or は/が must not compete merely because one is the source spelling.
Many advanced records currently test formation errors; they are correctness
exercises, not a calibrated measure of JLPT exam difficulty.

When changing an example:

1. Edit its reference source and update the matching review, including kana.
2. Read the complete sentence with each candidate inserted. Consider the German
   meaning, Japanese attachment, register, and any plausible alternative reading.
3. Explain why each distractor is wrong for this question. Add interchangeable
   forms to acceptedAnswers; choose a different distractor.
4. Run npm run build:quiz-review, npm run audit:quiz, and npm run test:quiz-review.

The compiler validates the complete review before writing files. The editorial
import (node scripts/edit-content.cjs) reapplies reviews after rebuilding spans
and stages its output until validation succeeds. Neither tool silently drops a
pattern. Runtime generation rejects stale or incomplete metadata and never
borrows answers from unrelated grammar patterns.

The audit generates every reviewed grammar question and every Kanji meaning
question by source identity, in addition to the existing seeded mixed quiz
sample. Regression fixtures cover alternative particles, normalized meaning
collisions, missing choices, shuffled answer keys, and stale review data.
Structural audits cannot prove that every future editorial choice is
linguistically sound; the sentence-level review remains necessary.
