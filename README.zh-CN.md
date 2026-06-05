# Codex LED Widget for macOS

一个面向 macOS 的 Codex 桌面常驻小组件，用本机 Codex 登录状态读取剩余额度，并以液态玻璃界面展示当前可用情况。

[English](./README.md)

## 功能

- 实时显示 Codex 剩余额度。
- 红绿灯状态：
  - 绿色：剩余 >= 10%，可用。
  - 黄色：剩余 < 10%，偏低。
  - 红色：剩余 = 0，已用尽。
- 显示 5 小时窗口和 7 天窗口的剩余比例与恢复时间。
- 默认每 60 秒自动刷新，也支持手动刷新。
- 小 / 中 / 大三档尺寸。
- 套餐显示支持 Free、Go、Plus、Pro、Business、Enterprise，默认 Plus。
- 桌面常驻模式：像日历、天气模块一样停留在桌面，不会被最小化隐藏。
- 折叠按钮会把小组件缩成仍然可见的桌面小胶囊，而不是隐藏窗口。
- 状态栏菜单支持显示、放回右上角、刷新、尺寸、套餐和开机启动。

## 工作原理

小组件通过本机 Codex 的 `app-server` 调用 `account/rateLimits/read` 获取额度信息。它不会展示你的 token，也不会把登录凭据写入界面。

## 安装使用

### 方式一：下载发行版

从 GitHub Releases 下载最新版 `.dmg`，拖入 Applications 后打开。

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

仓库根目录包含 `.codex-plugin/plugin.json`，可以作为 Codex 插件进行展示和分发。插件本身提供桌面小组件源码、安装说明和发布包入口。

## 注意

- 当前只验证了 Apple Silicon macOS 构建。
- 未进行 Apple Developer ID 签名，首次打开时 macOS 可能提示安全确认。
- 额度接口来自本机 Codex，未来 Codex 内部接口变化时可能需要更新适配器。
