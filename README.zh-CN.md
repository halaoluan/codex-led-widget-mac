# Codex LED Widget for macOS

一个漂亮的 macOS 桌面小组件，用来一眼查看本机 Codex 剩余额度。

[English](./README.md)

[![最新版](https://img.shields.io/github/v/release/halaoluan/codex-led-widget-mac?label=download)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![macOS](https://img.shields.io/badge/macOS-Apple%20Silicon-black)](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)

![Codex LED Widget 预览图](./assets/5.png)

## 下载

下载最新版 DMG：

**[下载 Codex LED Widget for macOS](https://github.com/halaoluan/codex-led-widget-mac/releases/latest)**

打开 `.dmg`，把 **Codex LED Widget** 拖进 **Applications**，然后启动即可。

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
- 状态栏菜单支持显示、放回右上角、刷新、尺寸、套餐和开机启动。

## 隐私说明

Codex LED Widget 只从你本机已经安装并登录的 Codex 应用读取额度信息。它不会上传你的 OpenAI 账号数据，不会展示 token，也不会把 Codex 登录凭据暴露在界面里。

小组件会启动本机 Codex `app-server`，并调用：

```text
account/rateLimits/read
```

## 安装使用

### 方式一：下载发行版

从 [GitHub Releases](https://github.com/halaoluan/codex-led-widget-mac/releases/latest) 下载最新版 `.dmg`，打开后拖入 Applications。

由于当前版本还没有 Apple Developer ID 签名，如果 macOS 首次打开时提示安全确认，可以到 **系统设置 > 隐私与安全性** 里允许打开。

### 方式二：从源码运行

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

## 当前限制

- 当前只验证了 Apple Silicon macOS 构建。
- 尚未进行 Apple Developer ID 签名，首次打开时 macOS 可能提示安全确认。
- 额度接口来自本机 Codex，未来 Codex 内部接口变化时可能需要更新适配器。

## 后续计划

- 同时支持 Apple Silicon 和 Intel Mac 的 Universal 构建。
- Apple Developer ID 签名和 notarization。
- Homebrew Cask 安装。
- 自动更新。

## License

MIT
