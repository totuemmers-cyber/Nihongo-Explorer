#!/usr/bin/env bash
# PreToolUse(Bash) hook: before a `git push` targeting main, snapshot the
# current remote main into the backup branch as a reset point.
#
# The backup branch always holds the pre-push version of main: we capture
# origin/main (the remote's current tip) BEFORE the new commits land, and
# force it onto the backup ref. Never blocks the push — on any failure it
# warns and lets the push proceed.

set -uo pipefail

BACKUP_BRANCH="claude/repeat-learning-path-integration-L7zew"

# The hook receives the tool-call JSON on stdin.
payload="$(cat)"
cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // ""' 2>/dev/null)"

# Only care about git push commands.
printf '%s' "$cmd" | grep -Eq '\bgit\b.*\bpush\b' || exit 0

# Determine whether this push targets main: either "main" appears explicitly,
# or it's a bare push while main is the checked-out branch.
targets_main=0
if printf '%s' "$cmd" | grep -Eq '\bmain\b'; then
  targets_main=1
elif printf '%s' "$cmd" | grep -Eq '\bgit\s+push\b' \
     && ! printf '%s' "$cmd" | grep -Eq '\bgit\s+push\b[^|;&]*\borigin\b[^|;&]+'; then
  cur="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  [ "$cur" = "main" ] && targets_main=1
fi
[ "$targets_main" = "1" ] || exit 0

# Refresh origin/main so the snapshot reflects the true remote tip, then park
# it on the backup branch. Errors are non-fatal: warn but allow the push.
msg=""
if git fetch origin main --quiet 2>/dev/null; then
  src="$(git rev-parse origin/main 2>/dev/null)"
  if [ -n "$src" ] && git push -f origin "origin/main:refs/heads/${BACKUP_BRANCH}" --quiet 2>/dev/null; then
    msg="Backed up pre-push main (${src:0:7}) to ${BACKUP_BRANCH}."
  else
    msg="Warning: could not update backup branch ${BACKUP_BRANCH}; push proceeding."
  fi
else
  msg="Warning: could not fetch origin/main for backup; push proceeding."
fi

printf '{"systemMessage": %s}\n' "$(printf '%s' "$msg" | jq -R -s '.')"
exit 0
