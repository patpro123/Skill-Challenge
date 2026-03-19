# GitHub Operations

Perform common GitHub operations using the `gh` CLI. Accepts an optional argument describing the operation.

**Usage:** `/github [operation]`

**Examples:**
- `/github` — show a menu of available operations
- `/github pr` — create a pull request
- `/github issues` — list open issues
- `/github review 123` — review PR #123
- `/github status` — check CI status on the current branch

---

## Step 1: Determine the Operation

If the user provided an argument (e.g., `/github pr`), map it to the relevant section below and proceed directly.

If no argument was given, use AskUserQuestion:

```
What would you like to do?

1. **pr** — Create a pull request from the current branch
2. **issues** — List and browse open issues
3. **review** — Review an open pull request
4. **status** — Check CI / workflow run status
5. **release** — Create a GitHub release
6. **clone** — Clone a repository

Reply with a number or keyword.
```

---

## Operations

### pr — Create a Pull Request

1. Run in parallel:
   - `git status` — confirm clean or staged working tree
   - `git log main..HEAD --oneline` (or `master` if `main` doesn't exist) — list commits to be included
   - `git diff main...HEAD` — summarize changes

2. Draft a PR title (≤70 chars) and body from the diff and commit log.

3. Check whether the branch has a remote tracking branch:
   ```bash
   git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null
   ```
   If not, push it:
   ```bash
   git push -u origin HEAD
   ```

4. Create the PR:
   ```bash
   gh pr create --title "<title>" --body "$(cat <<'EOF'
   ## Summary
   - <bullet>

   ## Test plan
   - [ ] <step>

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

5. Return the PR URL.

---

### issues — List Open Issues

1. Fetch issues:
   ```bash
   gh issue list --limit 20
   ```

2. Present the list to the user.

3. Use AskUserQuestion:
   ```
   Would you like to:
   - View the details of a specific issue? (provide the number)
   - Create a new issue?
   - Do nothing — just needed the list
   ```

4. **If view:** `gh issue view <number>`
5. **If create:** Ask for title and body, then:
   ```bash
   gh issue create --title "<title>" --body "<body>"
   ```

---

### review — Review a Pull Request

1. If no PR number was provided in the argument, fetch open PRs:
   ```bash
   gh pr list
   ```
   Use AskUserQuestion to ask which PR to review.

2. View the PR diff and description:
   ```bash
   gh pr view <number>
   gh pr diff <number>
   ```

3. Analyze the diff and produce a structured review covering:
   - **Summary** — what the PR does
   - **Concerns** — bugs, security issues, missing tests, or unclear logic
   - **Suggestions** — optional improvements
   - **Verdict** — Approve / Request changes / Comment

4. Use AskUserQuestion:
   ```
   Here's my review. Would you like to:
   - Submit it as-is
   - Edit the review before submitting
   - Just keep it as a local summary (don't submit)
   ```

5. If submitting, run the appropriate command:
   ```bash
   # Approve
   gh pr review <number> --approve --body "<review body>"

   # Request changes
   gh pr review <number> --request-changes --body "<review body>"

   # Comment only
   gh pr review <number> --comment --body "<review body>"
   ```

---

### status — Check CI Status

1. Get the current branch:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

2. List workflow runs for the branch:
   ```bash
   gh run list --branch <branch> --limit 5
   ```

3. If any run is in progress or failed, show details:
   ```bash
   gh run view <run-id>
   ```

4. Present a summary:
   - Branch name
   - Latest run: status, workflow name, trigger
   - Link to the run on GitHub

5. If a run failed, offer to show logs:
   ```bash
   gh run view <run-id> --log-failed
   ```

---

### release — Create a GitHub Release

1. List recent tags to understand versioning:
   ```bash
   git tag --sort=-version:refname | head -10
   ```

2. Use AskUserQuestion:
   ```
   What version tag should this release use?
   (e.g., v1.2.0 — latest tag was <last-tag>)
   ```

3. Use AskUserQuestion:
   ```
   Should I generate release notes from the git log since <last-tag>?
   Or paste your own release notes?
   ```

4. If generating, build notes from:
   ```bash
   git log <last-tag>..HEAD --oneline
   ```

5. Create the release:
   ```bash
   gh release create <tag> --title "<title>" --notes "<notes>"
   ```
   Add `--prerelease` if the user indicated a pre-release.

6. Return the release URL.

---

### clone — Clone a Repository

1. If no repo was specified in the argument, use AskUserQuestion:
   ```
   Which repository would you like to clone?
   (e.g., owner/repo or a full GitHub URL)
   ```

2. Clone it:
   ```bash
   gh repo clone <owner/repo>
   ```

3. Confirm the directory it was cloned into and report back.

---

## Safety Rules

- **Never force-push** (`--force`) unless the user explicitly requests it.
- **Never push to main/master directly** — always use a branch + PR.
- **Confirm before submitting** reviews, creating releases, or any action visible to other collaborators.
- If `gh` is not authenticated, surface the error and instruct the user to run `gh auth login`.
