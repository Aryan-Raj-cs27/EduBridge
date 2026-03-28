# Security Playbook (Secrets and Credentials)

## Current status
- Historical scan of this repository found no committed credentials or private keys.

## If a secret is ever exposed
1. Revoke and rotate the credential immediately in the provider dashboard.
2. Update deployment/runtime secrets (Vercel/GitHub/hosting) with the new value.
3. Remove the secret from working tree files.
4. Remove the secret from Git history if it was committed.
5. Force-push cleaned history and notify collaborators to re-clone.

## Local cleanup checklist
1. Remove secret from code/config.
2. Replace hardcoded values with environment variables.
3. Keep only placeholders in `.env.example`.
4. Confirm `.env*` files are ignored by `.gitignore`.

## History rewrite (if commit history contains secret)
Use `git filter-repo` (recommended) in a clean clone:

```powershell
# install once (Python required)
pip install git-filter-repo

# remove a specific file from all history
git filter-repo --path path/to/secret-file --invert-paths

# replace secret text everywhere (create replacements.txt first)
# format per line: old==>new
git filter-repo --replace-text replacements.txt

# force-push rewritten history
git push origin --force --all
git push origin --force --tags
```

## Verify no secrets remain
Run local checks before pushing:

```powershell
git rev-list --objects --all | Select-String -Pattern "(^|/)(\.env|\.env\.|.*\.pem$|.*\.key$|id_rsa|id_ed25519|credentials|secret|token)"
git grep -nI -E "(AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{20,}|BEGIN (RSA|OPENSSH|EC|DSA|PGP) PRIVATE KEY|api[_-]?key|secret|token|password)" $(git rev-list --all)
```

## CI protection
- Secret scanning workflow is enabled in `.github/workflows/secret-scan.yml`.
- Pull requests and pushes to `main` are scanned automatically.
