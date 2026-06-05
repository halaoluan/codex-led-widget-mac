# 中文发布文案

小红书、视频号、朋友圈等偏生活化平台，优先使用：

```text
launch-copy/xiaohongshu-high-engagement.md
```

## V2EX

标题：

```text
我做了一个 macOS 桌面小组件，用来查看 Codex 剩余额度
```

正文：

```text
最近每天高频使用 Codex，经常一天打开十几次额度页面，看还剩多少、什么时候恢复、还能不能继续写。

所以我做了一个 macOS 桌面小组件：Codex LED Widget。

它会把本机 Codex 剩余额度放在桌面上，用红绿灯状态展示：

- 绿色：可用，剩余额度 >= 10%
- 黄色：偏低，剩余额度 < 10%
- 红色：已用尽，剩余额度 = 0

额度恢复后会自动变回绿色。

目前支持：

- 5 小时窗口和 7 天窗口
- 恢复倒计时
- 中文 / 英文界面
- 小 / 中 / 大三档尺寸
- 桌面常驻和折叠显示
- Free、Go、Plus、Pro、Business、Team、Enterprise 套餐标签

隐私方面，它从本机已经安装并登录的 Codex 读取额度信息，不上传账号数据，不展示 token。

GitHub：
https://github.com/halaoluan/codex-led-widget-mac

下载：
https://github.com/halaoluan/codex-led-widget-mac/releases/latest

现在还是早期版本，只验证了 Apple Silicon Mac，欢迎试用和提 issue。
```

## 即刻 / 朋友圈

```text
做了一个小工具：Codex LED Widget for macOS。

最近每天用 Codex，总是反复打开额度页面看还剩多少、什么时候恢复，干脆做成了桌面小组件。

绿色 = 可用
黄色 = 偏低
红色 = 已用尽

支持中英文、小/中/大尺寸、桌面常驻、恢复倒计时。

它从本机 Codex 读取额度，不上传账号数据。

开源地址：
https://github.com/halaoluan/codex-led-widget-mac
```

## 掘金文章提纲

标题：

```text
我做了一个 macOS 桌面小组件，用来显示 Codex 剩余额度
```

结构：

```text
1. 为什么做这个工具
   - 高频使用 Codex
   - 反复打开额度页面
   - 想要一个桌面红绿灯状态

2. 它解决什么问题
   - 一眼看剩余额度
   - 看到恢复倒计时
   - 不影响当前工作流

3. 功能
   - 5 小时 / 7 天窗口
   - 红黄绿状态
   - 小中大尺寸
   - 中英文
   - 桌面常驻

4. 隐私
   - 本机读取
   - 不上传账号数据
   - 不展示 token

5. 开源和下载
   - GitHub 链接
   - Release 链接

6. 下一步计划
   - Universal build
   - 签名和 notarization
   - Homebrew Cask
   - 自动更新
```

## 小红书 / B 站短视频字幕

```text
每天用 Codex 的人，可能都会遇到这个问题：
总想看看额度还剩多少。

我之前一天能打开十几次额度页面。

所以做了一个 macOS 桌面小组件。

绿色：可用
黄色：偏低
红色：已用尽

额度恢复后会自动变回绿色。

支持中文/英文、小中大尺寸、桌面常驻。

开源在 GitHub：Codex LED Widget for macOS
```
