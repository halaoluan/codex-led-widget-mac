# Codex LED Widget 30-Day Growth Plan

This plan turns Codex LED Widget from a newly published GitHub repo into a project with visible traffic, downloads, feedback, and stars.

## Goal

Build awareness among Codex, ChatGPT, macOS, AI coding, and productivity users.

Primary goals for the first 30 days:

- 100+ GitHub stars.
- 300+ release downloads.
- 10+ useful issues or feature requests.
- 3+ public posts from people other than the maintainer.

## Current Position

- GitHub repository is public.
- README, Chinese README, release notes, topics, issue templates, privacy copy, and social preview asset are ready.
- Latest release page exists.
- Apple Silicon build is available.
- Main near-term weakness: no Universal build, no Apple Developer ID signing, no Homebrew Cask, no launch video yet.

## Core Message

### English

I got tired of opening the Codex quota page many times a day, so I built a tiny macOS desktop widget that shows the remaining quota at a glance. Green means available, yellow means low, red means exhausted. It reads the quota locally from the installed Codex app and does not upload account data.

### 中文

最近每天高频使用 Codex，总是反复打开额度页面看还剩多少、什么时候恢复，所以做了一个 macOS 桌面小组件。绿色表示可用，黄色表示偏低，红色表示已用尽。它从本机 Codex 读取额度，不上传账号数据。

## Channels

### Developer Communities

- Hacker News Show HN.
- Product Hunt.
- GitHub topics and trending discovery.
- Reddit communities that allow project sharing after checking rules.
- X / Twitter.

### Chinese Communities

- V2EX.
- 即刻.
- 掘金.
- 小红书.
- B 站动态 or short video.
- 微信朋友圈 / 技术群.

## Daily Plan

### Day 1-2: GitHub Landing Page

Status: done.

- Polish README and Chinese README.
- Add direct release download links.
- Add privacy and installation notes.
- Add repository topics.
- Add release notes.
- Add issue templates.
- Add social preview image asset.

### Day 3: Demo Assets

- Record a 15-second GIF:
  - Show the widget on the macOS desktop.
  - Switch between Chinese and English.
  - Switch small, medium, and large sizes.
  - Show collapse and restore behavior.
- Record a 30-second video:
  - Start with the pain: repeatedly opening the quota page.
  - Show the widget.
  - Show green/yellow/red status.
  - End with GitHub download link.
- Export four screenshots:
  - Desktop view.
  - Small size.
  - English UI.
  - Release download page.

### Day 4: Chinese Launch Copy

Prepare posts for V2EX, 即刻, 掘金, 小红书, and WeChat.

Use the copy in `launch-copy/chinese-posts.md`.

### Day 5: English Launch Copy

Prepare posts for X / Twitter, Show HN, Product Hunt, and Reddit.

Use the copy in `launch-copy/english-posts.md`.

### Day 6: V2EX Launch

- Post in a suitable node, such as macOS, 程序员, or 分享创造.
- Title:
  - `我做了一个 macOS 桌面小组件，用来查看 Codex 剩余额度`
- Reply to every useful comment within the first 12 hours.
- Do not ask directly for stars. Ask for feedback and issue reports.

### Day 7: 即刻 And WeChat

- Post the short Chinese version with the 15-second GIF.
- Send to relevant technical groups.
- Track GitHub stars and release downloads after 24 hours.

### Day 8: 掘金 Article

- Publish a lightweight build story:
  - Why the tool exists.
  - How it reads quota locally.
  - macOS desktop widget behavior.
  - Privacy and open-source link.

### Day 9: 小红书 / B 站 Short Video

- Use a screen recording plus short captions.
- Focus on the daily pain and visual result.
- Avoid making it look like a generic coding tool ad.
- For Xiaohongshu-style copy, use `launch-copy/xiaohongshu-high-engagement.md`.

### Day 10: Fix Feedback

- Review issues and comments.
- Fix the top 1-2 usability problems.
- Publish a patch release if needed.

### Day 11: X / Twitter Teaser

Post a short build story:

```text
I got tired of opening the Codex quota page over and over, so I built a tiny macOS desktop widget for it.

Green = available
Yellow = low
Red = exhausted

It reads the quota locally from the installed Codex app.
```

### Day 12: X / Twitter Demo

Post the 15-second GIF with the GitHub link.

### Day 13: Reddit Prep

- Identify 2-3 relevant subreddits.
- Read each community rule before posting.
- Use different titles and avoid duplicate spam-like posting.

### Day 14: Reddit Soft Launch

- Share in one suitable subreddit first.
- Reply to feedback.
- Do not cross-post everywhere on the same day.

### Day 15: Show HN

Title:

```text
Show HN: I made a macOS widget to track my Codex quota
```

First comment:

```text
I use Codex heavily and kept opening the quota page many times a day, so I built a small macOS desktop widget that shows the remaining quota at a glance.

Green means available, yellow means low, red means exhausted. It reads quota locally from the installed Codex app and does not upload account data.

Would love feedback from other Codex users, especially on macOS desktop behavior.
```

### Day 16: Show HN Follow-Up

- Reply to every high-signal comment.
- Turn repeated feedback into GitHub issues.
- Do not argue with low-signal comments.

### Day 17: Patch Release

- Fix one visible issue reported from the launch.
- Publish release notes that mention user feedback.

### Day 18: Product Hunt Prep

- Prepare name, tagline, description, screenshots, and maker comment.
- Make the gallery visual and simple.
- Confirm the latest release link is stable.

### Day 19: Product Hunt Dry Run

- Review the Product Hunt page copy.
- Ask 3-5 trusted users to test the download before launch.
- Do not ask for fake votes.

### Day 20: Product Hunt Launch

Tagline:

```text
A macOS desktop widget for tracking your Codex quota
```

Maker comment:

```text
I built Codex LED Widget because I kept checking the quota page while working with Codex. This keeps the quota state on the macOS desktop with a simple green/yellow/red signal, and it reads quota locally from the installed Codex app.

I would love feedback from other Codex users, especially on installation, desktop behavior, and what should be added next.
```

### Day 21: Product Hunt Follow-Up

- Reply to comments.
- Collect bug reports.
- Post a thank-you update on X and Chinese communities.

### Day 22: GitHub Project Hygiene

- Convert feedback into issues.
- Add labels:
  - `bug`
  - `enhancement`
  - `install`
  - `macos`
  - `privacy`
  - `release`
- Pin a roadmap issue.

### Day 23: Universal Build Investigation

- Check whether the project can build x64 and universal macOS artifacts.
- If feasible, prepare the next release plan.

### Day 24: Homebrew Cask Investigation

- Draft Homebrew Cask metadata.
- Confirm artifact URL and checksum workflow.

### Day 25: Signing And Notarization Plan

- Document Apple Developer ID requirements.
- Decide whether signing is worth doing before v1.0.

### Day 26: Publish Technical Article

Write a deeper article:

- Problem.
- macOS widget behavior.
- Local quota reading.
- Privacy design.
- Lessons learned from launch feedback.

### Day 27: Second Chinese Push

Post a short update:

- What changed after feedback.
- New release link.
- Thank early users.

### Day 28: Second English Push

Post an update on X / Reddit:

- Share download count or feedback summary.
- Mention the latest release.

### Day 29: Metrics Review

Record:

- Stars.
- Release downloads.
- GitHub traffic.
- Referrers.
- Issues opened.
- Top feedback themes.

### Day 30: Next-Month Plan

Decide the next milestone:

- Universal build.
- Signed and notarized app.
- Homebrew Cask.
- Auto-update.
- Better menu bar mode.
- More quota details.

Publish a small monthly recap.

## Weekly Metrics Template

```text
Week:
Stars:
Release downloads:
GitHub visitors:
Top referrers:
Issues:
Most requested feature:
Most common installation problem:
Next release target:
```

## Rules

- Do not ask communities to star the repo directly.
- Ask for feedback, issue reports, and real usage instead.
- Reply quickly during the first 12 hours after each post.
- Convert repeated comments into GitHub issues.
- Publish fixes visibly so people see the project is alive.
