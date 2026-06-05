# Codex LED Widget for macOS

A liquid-glass desktop widget for macOS that displays your local Codex usage quota without repeatedly opening the Codex quota page.

[中文说明](./README.zh-CN.md)

## Features

- Reads local Codex quota through the Codex app-server.
- Shows remaining quota for the active window.
- Displays 5-hour and 7-day quota windows with reset countdowns.
- Uses traffic-light status colors:
  - Green: remaining quota >= 10%.
  - Yellow: remaining quota < 10%.
  - Red: remaining quota = 0.
- Refreshes automatically every 60 seconds.
- Provides a manual refresh action.
- Supports small, medium, and large widget sizes.
- Supports Free, Go, Plus, Pro, Business, and Enterprise plan labels.
- Stays on the desktop like a calendar or weather widget.
- Includes a macOS menu bar entry for restore, refresh, size, plan, and launch-at-login actions.

## How It Works

The widget starts the local Codex `app-server` and calls:

```text
account/rateLimits/read
```

It does not display your token, and it does not expose Codex credentials in the UI.

## Install

### Option 1: Download a release

Download the latest `.dmg` from GitHub Releases, open it, and move the app to Applications.

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

## Notes

- Apple Silicon macOS builds are currently validated.
- The app is not signed with an Apple Developer ID, so macOS may show a first-run security prompt.
- The quota adapter depends on the local Codex app-server API. If Codex changes that API, the adapter may need an update.

## License

MIT
