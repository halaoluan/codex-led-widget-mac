# Codex LED Widget for macOS

A beautiful macOS desktop widget that shows your local Codex quota at a glance.

[中文说明](./README.zh-CN.md)

[![Latest release](https://img.shields.io/github/v/release/halaoluan/codex-led-widget-mac?label=download)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![macOS](https://img.shields.io/badge/macOS-Apple%20Silicon-black)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)

![Codex LED Widget preview](./assets/5.png)

## Download

Download the latest DMG:

**[Download Codex LED Widget for macOS](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)**

Open the `.dmg`, drag **Codex LED Widget** into **Applications**, then launch it.

## Why

If you use Codex heavily, checking the quota page again and again gets old fast. Codex LED Widget keeps the important quota state on your desktop:

- Green: available, remaining quota is at least 10%.
- Yellow: low, remaining quota is below 10%.
- Red: exhausted, remaining quota is 0.
- The widget turns green again automatically after the quota window resets.

## Features

- Reads local Codex quota through the Codex app-server.
- Shows remaining quota for the active window.
- Displays 5-hour and 7-day quota windows with reset countdowns.
- Supports Free, Go, Plus, Pro, Business, Team, and Enterprise plan labels.
- Supports Chinese and English UI.
- Supports small, medium, and large widget sizes.
- Stays on the desktop like a calendar or weather widget.
- Collapses into a visible desktop pill instead of disappearing.
- Refreshes automatically every 60 seconds, with a manual refresh action.
- Includes a macOS menu bar entry for restore, refresh, size, plan, and launch-at-login actions.

## Privacy

Codex LED Widget reads quota information locally from your installed Codex app. It does not upload your OpenAI account data, does not display your token, and does not expose Codex credentials in the UI.

The widget starts the local Codex `app-server` and calls:

```text
account/rateLimits/read
```

## Install

### Option 1: Download a release

Download the latest `.dmg` from [GitHub Releases](https://github.com/halaoluan/codex-led-widget-mac/releases/latest), open it, and move the app to Applications.

If macOS shows a first-run security prompt because the app is not signed yet, open **System Settings > Privacy & Security** and allow the app to run.

### Option 2: Run from source

```bash
npm install
npm start
```

If Codex is not installed at `/Applications/Codex.app`, set the Codex CLI path:

```bash
CODEX_CLI_PATH="/path/to/codex" npm start
```

## Build

```bash
npm run build
```

Build artifacts are written to `dist/`.

## Use as a Codex Plugin

This repository is also structured as a Codex plugin. The plugin manifest lives at:

```text
.codex-plugin/plugin.json
```

The plugin presents the macOS desktop widget, installation instructions, and release artifacts as a Codex-discoverable package.

## Included Publishing Skill

This repository also includes a reusable Codex skill at:

```text
skills/github-plugin-publisher
```

Use it when you want Codex to package a small app or plugin, write bilingual GitHub documentation, prepare release notes, configure repository metadata, and publish a public GitHub release.

## Launch Plan

The public growth plan and ready-to-use launch copy live in:

```text
GROWTH_PLAN.md
launch-copy/
```

## Current Limitations

- Apple Silicon macOS builds are currently validated.
- The app is not signed with an Apple Developer ID, so macOS may show a first-run security prompt.
- The quota adapter depends on the local Codex app-server API. If Codex changes that API, the adapter may need an update.

## Roadmap

- Universal macOS build for both Apple Silicon and Intel Macs.
- Apple Developer ID signing and notarization.
- Homebrew Cask installation.
- Automatic updates.

## License

MIT
