# If the push refs start with (delete), then we're deleting a branch, so skip the pre-push hook
STDIN=$(cat -)
if echo "$STDIN" | grep -q "^(delete)"; then
  echo "(delete) found at start of push refs, skipping husky pre-push hook"
  echo $STDIN
  exit 1
fi

exit 0
