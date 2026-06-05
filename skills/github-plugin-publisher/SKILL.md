---
name: github-plugin-publisher
description: Package, document, release, and promote a small desktop app, developer tool, or Codex plugin as a public GitHub project. Use when the user asks to publish or 上架 a plugin/app to GitHub, create bilingual README and release notes, prepare a .codex-plugin manifest, build release artifacts, configure repository description/topics/social presentation, or turn a local project into a polished public open-source download page.
---

# GitHub Plugin Publisher

## Overview

Use this skill to turn a local plugin, desktop widget, or developer tool into a public GitHub project that strangers can understand, trust, download, and star. Favor a complete release flow over isolated edits: package, document, publish, verify, and leave launch-ready copy.

For detailed checklists and copy patterns, read `references/release-checklist.md` when the task involves public release, repository polish, or promotion.

## Workflow

1. Establish the product identity.
   - Identify the app/plugin name, target platform, one-sentence value proposition, main user pain, privacy posture, and release artifact type.
   - Inspect existing project files before writing copy. Prefer existing screenshots, app names, versions, and build scripts.

2. Prepare Codex plugin metadata when relevant.
   - Ensure `.codex-plugin/plugin.json` exists when the user wants the project distributed as a Codex plugin.
   - Include a clear display name, short description, long description, tags, homepage/repository links, and useful prompt examples.
   - Validate JSON syntax and keep marketplace copy non-hypey and specific.

3. Polish bilingual documentation.
   - Create or improve `README.md` and `README.zh-CN.md`.
   - Put the download link, screenshot/GIF, short value proposition, install instructions, privacy note, limitations, and roadmap in the first useful sections.
   - Use direct GitHub Releases links for downloads.
   - Explain unsigned macOS first-run behavior when applicable.

4. Build and validate release artifacts.
   - Run the project’s existing build script rather than inventing a new packaging flow.
   - Confirm artifact names, target architecture, and file existence.
   - If the app is installed locally for user testing, update the local installed copy only when appropriate and clearly report it.

5. Publish on GitHub.
   - Check `git status` first and avoid overwriting unrelated user changes.
   - Commit only the relevant files with a clear message.
   - Push to the intended public repository.
   - Create or update a GitHub Release with concise bilingual notes and upload artifacts.
   - Configure repository description, homepage, and topics when using `gh` is available.

6. Improve public discoverability.
   - Add issue templates, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, and a social preview asset when missing.
   - Recommend setting GitHub Social Preview manually in the web UI if automation cannot set it.
   - Verify the public repository, latest release, release assets, and topics after publication.

7. Close with actionable links.
   - Give the user the repository URL, release URL, direct download link when available, commit hash, and anything they still need to do manually.
   - Keep the final response short enough to scan.

## Quality Bar

- The first screen of the README must answer: what is this, who is it for, why use it, how to download it, and whether it is safe.
- Release notes must be usable by someone who did not read the conversation.
- Privacy claims must be accurate and grounded in code behavior.
- Topics must be search-friendly and specific.
- Do not claim Apple signing, notarization, Universal binary support, or Homebrew support unless verified.
- Do not call a project publicly released until the GitHub URL and release assets have been verified.

## Useful Commands

Use these patterns when appropriate:

```bash
gh repo view OWNER/REPO --json description,homepageUrl,repositoryTopics,url
gh repo edit OWNER/REPO --description "..." --homepage "..." --add-topic topic
gh release view TAG --repo OWNER/REPO --json name,tagName,url,assets
gh release edit TAG --repo OWNER/REPO --notes-file RELEASE_NOTES.md
```

Prefer `gh release create` for a new release and `gh release upload --clobber` only when intentionally replacing assets.
