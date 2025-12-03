# Release Manager for Yamisskey
GitHub Actions workflows for release management of Yamisskey. This version is specifically designed for Yamisskey's unique versioning system.

## Yamisskey Versioning System
Yamisskey uses a unique versioning format based on Misskey with additional suffix:
- **Format**: `YYYY.MM.patch-yami-x.x.x`
- **Example**: `2024.8.0-yami-1.2.3` → `2024.8.0-yami-1.2.4`

### Branch Structure
Yamisskey uses standard branch names:
- **`develop`**: Development branch (default branch)
- **`staging`**: Staging branch for pre-production testing
- **`master`**: Production release branch

## Installation
### 1. No Variables Required!
This version has been optimized to work without any Repository Variables configuration:
- **Stable branch**: Fixed to `master`
- **Package.json handling**: Fixed to `package.json` with tab indentation
- **External app usage**: Enabled by default

### 2. workflows you should copy
Copy and use these workflows.

#### ⅰ. release-with-dispatch.yml (Release Manager [Dispatch])
The core workflow that is manually triggered. It has three functions:

1. Prepare release - create PR and alpha.0 tag
2. Issue a pre-release version during the release process
3. Issue a release candidate, when you check `Start Release Candidate`
4. Issue a stable release and merge PR, when you check `MERGE RELEASE BRANCH TO MAIN`

#### ⅱ. release-edit-with-push.yml
This workflow changes the description of the PR when CHANGELOG.md is changed.

You must modify line#6 with the default (develop) branch.

#### ⅲ. release-with-ready.yml
Release rc when PR becomes ready for review.

### 3. Create a GitHub App
You must create a GitHub App with following settings and set `RELEASE_APP_ID` and `RELEASE_APP_PRIVATE_KEY` as secrets.

Please execute following installation: https://github.com/actions/create-github-app-token/tree/v1/?tab=readme-ov-file#usage

- The `Contents` permission is required for the `on: release` workflow to run via automatic release.  
  The reason is that `on: release` workflows are not triggered for releases created with the default `GITHUB_TOKEN`.
- The `Pull requests` permission is required to bypass the protect on the stable branch and perform PR merges.

|App Settings||
|:--|:--|
|Webhook||
|Active|disabled|
|Repository permission||
|Contents|Read and Write|
|Pull requests|Read and Write|

Open `Install App` tab and install to the repository or whole the user/organization.

### 4. Create a ruleset to protect the master branch
To maintain the integrity of the master branch, it is recommended that it prohibit push by ruleset.

|New Branch Ruleset||
|:--|:--|
|Enforcement status|Active|
|Bypass list||
|+ Add bypass|GitHub App you created and installed|
|Targets|
|Target branches|master|
|Branch protections||
|Restrict creations|Enable|
|Restrict updates|Enable|
|Restrict deletions|Enable|
|Require a pull request before merging|Enable|
|Required approvals|1|
|Block force pushes|Enable|

## Repository secrets and variables
### Secrets (Required)
<dl>
<dt><code>RELEASE_APP_ID</code></dt>
<dd>GitHub App ID for external app authentication</dd>
<dt><code>RELEASE_APP_PRIVATE_KEY</code></dt>
<dd>PEM certificate for GitHub App authentication</dd>
</dl>

### Variables (None Required!)
All configuration has been hardcoded for Yamisskey:
- **Stable branch**: `master` (fixed)
- **Package.json**: `package.json` (fixed)
- **Indentation**: Tab (fixed)
- **External app**: Enabled (fixed)

## Version Increment Logic
The workflow automatically handles Yamisskey version increments:

1. **From `yami`**: Increments patch version (e.g., `1.2.3` → `1.2.4`)
2. **From non-Yamisskey**: Starts with `yami-1.0.0`

### Examples
- `2024.8.0-yami-1.2.3` → `2024.8.0-yami-1.2.4`
- `2024.8.0` → `2024.8.0-yami-1.0.0`
