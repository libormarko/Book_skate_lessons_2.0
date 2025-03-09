#!/bin/bash

# Check for API keys or tokens in files that will be committed
echo "Checking for potential API keys or tokens in staged files..."

# Patterns to search for
patterns=(
  "key"
  "secret"
  "token"
  "password"
  "auth"
  "credential"
  "api[_-]key"
)

# Join patterns with | for grep
pattern=$(IFS="|"; echo "${patterns[*]}")

# Check staged files
result=$(git diff --cached --name-only | xargs grep -l -i -E "$pattern" 2>/dev/null)

if [ -n "$result" ]; then
  echo "⚠️  WARNING: Potential sensitive information found in these files:"
  echo "$result"
  echo "Please review these files before committing!"
  exit 1
else
  echo "✅ No obvious sensitive information found in staged files."
  exit 0
fi