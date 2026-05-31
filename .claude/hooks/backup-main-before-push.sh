#!/usr/bin/env bash
# PreToolUse(Bash) hook: before a `git push` that updates main, snapshot the
# CURRENT remote main into the backup branch as a pre-push reset point.
#
# The backup branch always holds the version of main that existed right BEFORE
# the push. Never blocks the push — on any failure it warns and lets it proceed.
#
# Hardening (see git history): the previous version matched any command merely
# containing the words "push" and "main", so a read-only command that referenced
# the backup branch ("…/main-pre-push") re-triggered the hook AFTER a push and
# clobbered the snapshot with the just-pushed commit. This version:
#   1) ignores mentions of its own backup branch name before scanning,
#   2) only reacts to a real `git … push` subcommand (not the word "push"),
#   3) treats "main" only as a standalone ref token (not "main-pre-push" etc.),
#   4) refuses to overwrite the backup with the very commit being pushed.

set -uo pipefail

BACKUP_BRANCH="backup/main-pre-push"

# The hook receives the tool-call JSON on stdin.
payload="$(cat)"
cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // ""' 2>/dev/null)"

# Strip any mention of our own backup branch so read-only commands that merely
# reference "…/main-pre-push" can never trip the heuristics below.
scan="${cmd//$BACKUP_BRANCH/}"

# Require an actual `git … push` invocation: "git", optional flags, then "push".
# This rejects e.g. `git commit -m "fix push"` and `git ls-remote … main`.
printf '%s' "$scan" | grep -Eq 'git[[:space:]]+(-[^[:space:]]+[[:space:]]+)*push([[:space:]]|$)' || exit 0

# Does this push update main? Either an explicit standalone "main" ref token
# (origin main, HEAD:main, refs/heads/main) or a bare push while on main.
targets_main=0
if printf '%s' "$scan" | grep -Eq '(^|[^[:alnum:]_])main([^[:alnum:]_-]|$)'; then
  targets_main=1
elif ! printf '%s' "$scan" | grep -Eq 'push[[:space:]]+[^|;&]*[^[:space:]|;&]'; then
  # `git push` with no refspec args → depends on the checked-out branch.
  cur="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  [ "$cur" = "main" ] && targets_main=1
fi
[ "$targets_main" = "1" ] || exit 0

# Read the remote's CURRENT main tip directly — authoritative, with no reliance
# on a possibly-stale local tracking ref.
src="$(git ls-remote origin refs/heads/main 2>/dev/null | awk 'NR==1{print $1}')"
head_sha="$(git rev-parse HEAD 2>/dev/null)"

msg=""
if [ -z "$src" ]; then
  msg="Warning: could not read remote main for backup; push proceeding."
elif [ "$src" = "$head_sha" ]; then
  # Remote main already equals what we're pushing → nothing new to back up.
  # (Also stops a stray re-trigger from clobbering the snapshot post-push.)
  msg="Backup skipped: remote main already at the pushed commit (${src:0:7})."
elif git push -f origin "${src}:refs/heads/${BACKUP_BRANCH}" --quiet 2>/dev/null; then
  msg="Backed up pre-push main (${src:0:7}) to ${BACKUP_BRANCH}."
else
  msg="Warning: could not update backup branch ${BACKUP_BRANCH}; push proceeding."
fi

printf '{"systemMessage": %s}\n' "$(printf '%s' "$msg" | jq -R -s '.')"
exit 0
