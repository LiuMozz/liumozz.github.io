# 猛男妙妙屋 待优化项目 (TODO List)

以下是本项目待优化和修复的任务列表。在完成对应任务后，请在方括号中标记 `[x]` 并记录对应的 Git commit ID。

## 🎨 动效与交互优化
- [x] **整站平滑无刷新过渡**
  - **描述**：集成 Astro 的 `<ClientRouter />` (View Transitions)，让页面间跳转更流畅，并解决跨页面音乐播放中断的问题。
  - **完成标记**：`[x]`
  - **Commit ID**：`74402d7`

## 🐛 缺陷修复
- [ ] **旅行与游戏页面的视频播放失败 (403 错误)**
  - **描述**：修复 [travel.astro](file:///d:/AntigravityWorkspace/self_blog/src/pages/travel.astro) 和 [gaming.astro](file:///d:/AntigravityWorkspace/self_blog/src/pages/gaming.astro) 中的 Mixkit 视频源被限制防盗链导致 403 的问题，使用稳定、开放的视频 CDN 替换。
  - **完成标记**：`[ ]`
  - **Commit ID**：-

- [ ] **音乐馆默认时长显示问题**
  - **描述**：优化 [MusicPlayer.astro](file:///d:/AntigravityWorkspace/self_blog/src/components/MusicPlayer.astro) 页面首次加载时默认显示 `0:00` 的问题，改为显示 `--:--`，并在音频数据加载完成后再更新。
  - **完成标记**：`[ ]`
  - **Commit ID**：-
