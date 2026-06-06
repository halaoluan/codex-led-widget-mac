cask "codex-led-widget" do
  version "0.1.8"
  arch arm: "universal", intel: "universal"

  url "https://github.com/halaoluan/codex-led-widget-mac/releases/download/v#{version}/Codex-LED-Widget-#{version}-mac-#{arch}.dmg"
  sha256 :no_check

  name "Codex LED Widget"
  desc "macOS desktop widget for local Codex quota"
  homepage "https://github.com/halaoluan/codex-led-widget-mac"

  app "Codex LED Widget.app"

  zap trash: [
    "~/Library/Application Support/Codex LED Widget",
    "~/Library/Preferences/cn.codex.led.widget.mac.plist",
    "~/Library/Saved Application State/cn.codex.led.widget.mac.savedState"
  ]
end
