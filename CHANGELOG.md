# Changelog

## Unreleased

- Added Universal, Apple Silicon, and Intel Mac build scripts.
- Added Apple Developer ID signing and notarization configuration with safe local-build fallback.
- Added GitHub Release based automatic update checks for packaged builds.
- Added a Homebrew Cask template for future tap publication.
- Expanded English and Chinese README installation, privacy, signing, notarization, Homebrew, and build instructions.
- Clarified privacy claims: the app does not collect, upload, or save OpenAI account information.

## 0.1.8

- Added automatic plan detection instead of defaulting the display to Plus.
- Added quota caching and automatic retry backoff to reduce repeated Codex app-server launches.
- Added clearer quota read error categories for missing Codex, timeouts, sign-in issues, server exits, and changed responses.
- Added remaining quota percentage to collapsed mode.

## 0.1.7

- Changed the minimize control into a visible collapse/expand action.
- Collapsed mode keeps the widget on the desktop instead of hiding it.
- Added collapsed-mode UI feedback in Chinese and English.

## 0.1.6

- Added desktop-persistent mode for macOS.
- Changed the pin button into a "pin to desktop" action with visual feedback.
- Added bilingual UI labels for the quota title.
- Added Free, Go, Plus, Pro, Business, and Enterprise plan display options.
- Added small, medium, and large widget size modes.
- Added real Codex quota reading through local Codex app-server.
