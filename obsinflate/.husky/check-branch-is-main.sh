#!/bin/sh

# List of main branches
MAIN_BRANCHES="next/main"

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if the current branch is one of the main branches
for BRANCH in $MAIN_BRANCHES; do
  if [ "$CURRENT_BRANCH" = "$BRANCH" ]; then
    exit 0
  fi
done

# If not on a main branch, exit with a non-zero status
echo "Husky hooks are disabled on branch: $CURRENT_BRANCH"
exit 1
