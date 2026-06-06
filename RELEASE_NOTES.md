# Codex LED Widget for macOS 0.1.8

## English

Codex LED Widget is a liquid-glass macOS desktop widget for checking your local Codex quota without repeatedly opening the quota page.

### Download

Download the `.dmg`, open it, and move **Codex LED Widget** to Applications:

https://github.com/halaoluan/codex-led-widget-mac/releases/latest

### Highlights

- Reads local Codex quota through the Codex app-server.
- Shows 5-hour and 7-day quota windows with reset countdowns.
- Uses green, yellow, and red status colors for available, low, and exhausted quota.
- Supports Free, Go, Plus, Pro, Business, Team, and Enterprise plan labels.
- Supports Chinese and English UI.
- Supports small, medium, and large widget sizes.
- Stays visible on the desktop like a calendar or weather widget.
- Changes the minimize button into a visible collapse/expand action, so the widget does not disappear.
- Detects the real Codex plan automatically instead of defaulting to Plus.
- Uses quota caching and retry backoff to make automatic refresh lighter and more stable.
- Shows clearer local error messages when Codex is missing, signed out, slow to respond, or returns an unexpected quota response.
- Shows the remaining quota percentage even in collapsed mode.

### Privacy

The app reads quota information locally from your installed Codex app. It does not upload OpenAI account data, display tokens, or expose Codex credentials in the UI.

### Notes

- Apple Silicon macOS builds are currently validated.
- The app is not signed with an Apple Developer ID yet. If macOS shows a first-run security prompt, open **System Settings > Privacy & Security** and allow the app to run.

## 中文

Codex LED Widget 是一个液态玻璃风格的 macOS 桌面小组件，用来查看本机 Codex 剩余额度，不用反复打开额度页面。

### 下载

下载 `.dmg`，打开后把 **Codex LED Widget** 拖入 Applications：

https://github.com/halaoluan/codex-led-widget-mac/releases/latest

### 亮点

- 通过本机 Codex app-server 读取剩余额度。
- 显示 5 小时窗口和 7 天窗口的额度比例与恢复倒计时。
- 使用绿色、黄色、红色展示可用、偏低、已用尽三种状态。
- 套餐显示支持 Free、Go、Plus、Pro、Business、Team、Enterprise。
- 支持中文和英文界面。
- 支持小 / 中 / 大三档尺寸。
- 像日历、天气模块一样常驻桌面。
- 将最小化按钮改为可见的折叠 / 展开动作，避免小组件消失。
- 自动识别真实 Codex 套餐，不再默认显示 Plus。
- 增加额度缓存和自动重试退避，让自动刷新更轻、更稳定。
- Codex 未安装、未登录、响应超时或额度接口异常时，会显示更清楚的本地错误提示。
- 折叠模式也会显示剩余额度百分比。

### 隐私说明

应用只从你本机已经安装并登录的 Codex 读取额度信息。它不会上传 OpenAI 账号数据，不会展示 token，也不会把 Codex 登录凭据暴露在界面里。

### 注意

- 当前只验证了 Apple Silicon macOS 构建。
- 尚未进行 Apple Developer ID 签名。如果 macOS 首次打开时提示安全确认，可以到 **系统设置 > 隐私与安全性** 里允许打开。
