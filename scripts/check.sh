#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

hugo_bin="${HUGO:-hugo}"
"$hugo_bin" --minify --cleanDestinationDir --destination public
python3 scripts/check_site.py public
node --test tests/directory*.mjs
node --test tests/analytics*.mjs
python3 -m unittest discover -s tests -p 'test_blog_*.py'
python3 -m unittest discover -s tests -p 'test_publish*.py'
python3 -m unittest discover -s tests -p 'test_infra*.py'
