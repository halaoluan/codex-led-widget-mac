# Public GitHub Release Checklist

Use this checklist when publishing a desktop app, developer tool, or Codex plugin.

## Repository Landing Page

- Add a concise repository description:
  - Pattern: `A beautiful macOS desktop widget that shows your local Codex quota at a glance.`
  - Keep it under one sentence and make the user benefit obvious.
- Add a homepage URL pointing to the latest release or project page.
- Add topics that match product, platform, framework, and audience:
  - Example: `codex`, `openai-codex`, `chatgpt`, `macos`, `electron`, `desktop-widget`, `quota`, `ai-tools`, `developer-tools`, `productivity`.
- Add a 1280x640 social preview image asset if the project has screenshots.
- Tell the user to set the GitHub Social Preview manually if automation is unavailable:
  - `Settings > General > Social preview`.

## README Structure

Use this order for both English and Chinese README files:

1. Product name.
2. One-sentence value proposition.
3. Language switch link.
4. Release/license/platform badges.
5. Screenshot or GIF.
6. Download section with GitHub Releases link.
7. Why section that describes the user pain.
8. Features.
9. Privacy.
10. Install from release.
11. Run from source.
12. Build.
13. Plugin distribution notes when relevant.
14. Current limitations.
15. Roadmap.
16. License.

## Release Notes

Release notes should be bilingual when the target audience includes both Chinese and English users.

Include:

- What the app/plugin is.
- Download instructions.
- Highlights.
- Privacy statement.
- Platform and signing notes.

Do not include long implementation history. Users on a release page are deciding whether to download.

## Codex Plugin Manifest

When publishing as a Codex plugin, ensure `.codex-plugin/plugin.json` includes:

- Plugin name and version.
- Description and developer name.
- Tags.
- Marketplace display name.
- Short description and long description.
- Repository or homepage URLs.
- Prompt examples that help users understand the plugin.

Validate the manifest as JSON before committing.

## Trust And Safety Copy

For local quota or account tools, use precise privacy language:

- Say what is read locally.
- Say what is not uploaded.
- Say whether tokens or credentials are displayed.
- Mention external API or local app-server dependency if applicable.

Avoid broad claims like "completely secure" unless independently audited.

## GitHub Health Files

Add these when missing:

- `LICENSE`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`

## Publication Verification

After pushing, verify:

- `git status` is clean.
- Repository is public.
- Description, homepage, and topics are visible.
- Latest release exists.
- Release assets are uploaded.
- README download links work.
- Release notes match current artifact version.

## Final Response Template

Keep the user-facing closeout concise:

```text
已完成并推送到 GitHub。

完成内容：
- ...

链接：
- 仓库：...
- 最新下载页：...

还需要手动处理：...
```
