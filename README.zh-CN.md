# Codex LED Widget for macOS

一个漂亮的 macOS 桌面小组件，用来一眼查看本机 Codex 剩余额度。

[English](./README.md)

[![最新版](https://img.shields.io/github/v/release/halaoluan/codex-led-widget-mac?label=download)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![macOS](https://img.shields.io/badge/macOS-Universal-black)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)

![Codex LED Widget 预览图](./assets/5.png)

## 下载

下载最新版 DMG：

**[下载 Codex LED Widget for macOS](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)**

打开 `.dmg`，把 **Codex LED Widget** 拖进 **Applications**，然后启动即可。

发布构建已经按 Apple Silicon、Intel Mac 和 Universal macOS 包准备。

## 为什么做它

如果你每天频繁使用 Codex，反复打开额度页面会很麻烦。Codex LED Widget 把最重要的额度状态放在桌面上：

- 绿色：可用，剩余额度 >= 10%。
- 黄色：偏低，剩余额度 < 10%。
- 红色：已用尽，剩余额度 = 0。
- 额度恢复后会自动变回绿色。

## 功能

- 通过本机 Codex app-server 读取 Codex 剩余额度。
- 显示当前窗口的剩余额度。
- 显示 5 小时窗口和 7 天窗口的剩余比例与恢复倒计时。
- 套餐显示支持 Free、Go、Plus、Pro、Business、Team、Enterprise。
- 支持中文和英文界面。
- 支持小 / 中 / 大三档尺寸。
- 桌面常驻，像日历、天气模块一样留在桌面。
- 折叠后会变成仍然可见的桌面小胶囊，不会彻底隐藏。
- 默认每 60 秒自动刷新，也支持手动刷新。
- 打包版支持基于 GitHub Release 的自动更新。
- 状态栏菜单支持显示、放回右上角、刷新、尺寸、套餐和开机启动。

## 隐私说明

Codex LED Widget 只从你本机已经安装并登录的 Codex 应用读取额度信息。

- 不收集你的 OpenAI 账号信息。
- 不上传你的 OpenAI 账号信息。
- 不保存你的 OpenAI 账号信息。
- 不展示 token。
- 不把 Codex 登录凭据暴露在界面里。

小组件会启动本机 Codex `app-server`，并调用：

```text
account/rateLimits/read
```

## 安装使用

### 方式一：下载发行版

从 [GitHub Releases](https://github.com/halaoluan/codex-led-widget-mac/releases/latest) 下载最新版 `.dmg`，打开后拖入 Applications。

如果发行版已经完成 Apple Developer ID 签名和 notarization，macOS 应该可以正常打开。如果你使用的是未签名社区构建，首次打开时可能需要到 **系统设置 > 隐私与安全性** 里允许打开。

### 方式二：Homebrew Cask

项目已经准备了 `homebrew/codex-led-widget.rb`。等 Universal DMG 发布并同步到 tap 后，开发者用户可以一行安装：

```bash
brew install --cask codex-led-widget
```

### 方式三：从源码运行

```bash
npm install
npm start
```

如果 Codex 没有安装在 `/Applications/Codex.app`，可以指定 Codex CLI 路径：

```bash
CODEX_CLI_PATH="/path/to/codex" npm start
```

## 构建

```bash
npm run build
```

构建产物会生成在 `dist/` 目录。

常用构建命令：

```bash
npm run build          # 有签名凭据时构建签名 Universal 包
npm run build:unsigned # 本地测试用未签名 Universal 包
npm run build:arm64    # Apple Silicon 包
npm run build:x64      # Intel Mac 包
```

### 代码签名和 notarization

项目已经配置 Apple Developer ID 签名和 notarization。公开发布前设置以下环境变量：

```bash
export CSC_NAME="Developer ID Application: Your Name (TEAMID)"
export APPLE_ID="you@example.com"
export APPLE_APP_SPECIFIC_PASSWORD="xxxx-xxxx-xxxx-xxxx"
export APPLE_TEAM_ID="TEAMID"
npm run build
```

如果没有这些变量，公证步骤会自动跳过，本地开发构建不受影响。

## 作为 Codex 插件

仓库根目录包含：

```text
.codex-plugin/plugin.json
```

这个 manifest 可以让项目作为 Codex 插件展示和分发，插件内容包括 macOS 桌面小组件源码、安装说明和发布包入口。

## 内置发布 Skill

这个仓库还包含一个可复用的 Codex skill：

```text
skills/github-plugin-publisher
```

当你想让 Codex 帮你把小工具或插件打包、写中英文 GitHub 说明、准备 Release Notes、配置仓库信息并公开发布到 GitHub 时，可以使用这个 skill。

## 增长计划

公开的 30 天增长计划和可直接使用的发布文案放在：

```text
GROWTH_PLAN.md
launch-copy/
```

## 当前限制

- 已配置 Universal、arm64、x64 构建脚本；每次正式发布前仍建议在真实设备上验证产物。
- 公开发行版需要有效 Apple Developer ID 证书和 notarization 凭据，才能获得最佳 macOS 安装体验。
- 额度接口来自本机 Codex，未来 Codex 内部接口变化时可能需要更新适配器。

## 后续计划

- 将 Homebrew Cask 发布到 tap。
- 增加更完整的应用内更新进度展示。

## License

MIT
