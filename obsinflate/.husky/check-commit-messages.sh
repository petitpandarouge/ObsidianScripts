#!/bin/sh

echo "Checking commit messages..."

# Get the list of commits that are being pushed
commits=$(git rev-list origin/$(git rev-parse --abbrev-ref HEAD)..HEAD)

# Check each commit message
for commit in $commits; do
  commit_message=$(git log -1 --pretty=%B $commit)
  echo "$commit_message" | npx --no-install commitlint
done
