# 猛男妙妙屋 待优化项目 (TODO List)

以下是本项目待优化和修复的任务列表。在完成对应任务后，请在方括号中标记 `[x]` 并记录对应的 Git commit ID。

## 🎨 动效与交互优化
- [x] **整站平滑无刷新过渡**
  - **描述**：集成 Astro 的 `<ClientRouter />` (View Transitions)，让页面间跳转更流畅，并解决跨页面音乐播放中断的问题。
  - **完成标记**：`[x]`
  - **Commit ID**：`74402d7`

- [x] **动态背景主题切换与“银河星空”动画**
  - **描述**：在 Layout 中集成 Iframe 背景引擎，新增导航栏“主题”控制面板与透明度滑块，并基于 Canvas 编写黑色基底的动态银河星空背景网页。
  - **完成标记**：`[x]`
  - **Commit ID**：`4973290`

- [x] **北京时间日期实时显示**
  - **描述**：在主页右上角实现极简实时时钟（Asia/Shanghai），移除方框、图标和多余汉字，星期采用首字母大写英文简称（如 `Mon`），并使用等宽排列防止字符宽度变动抖动。
  - **完成标记**：`[x]`
  - **Commit ID**：`83a8c7f`

- [x] **全局返回按钮与返回上一页功能**
  - **描述**：在所有非主页的子页面左上角集成毛玻璃材质的极简圆形返回按钮（仅包含单线条左箭头图标），悬浮时向左微移 `3px`，绑定 `history.back()`，并结合 Astro 路由转场事件监听器实现状态与主题的无闪烁无缝保留。
  - **完成标记**：`[x]`
  - **Commit ID**：`83a8c7f`

- [x] **“温和明亮”浅色主题去黄微调与转场持久化**
  - **描述**：底色换为高级暖奶油桃皮色（`#FFF0DB`），全站卡片与列表统一换为舒适的莫兰迪卡其色（`#F5E5CB`），文字颜色更换为高对比度且护眼的深石板蓝（`#0A3D5C`），并通过 `astro:before-swap` 转场监听拷贝 `data-theme` 属性实现无缝持久化。
  - **完成标记**：`[x]`
  - **Commit ID**：`83a8c7f`

- [x] **顶栏搜索与主题控制图标精简**
  - **描述**：搜索框移除了冗余框线和“搜索”字样，改为单线条 SVG 放大镜图标，悬停时散发紫色微光；主题按钮移除了图标与框线，只保留“主题”文字，悬停时散发青色微光。
  - **完成标记**：`[x]`
  - **Commit ID**：`83a8c7f`

- [x] **顶栏字体样式优化与全局化**
  - **描述**：移除新增的 `Outfit` 字体依赖，回归全站原生 `Inter` 字体，放大顶栏字体字号（Logo 设为 `1.7rem`，导航菜单项设为 `1.1rem`），字重设为最饱满的 `800`/`700`，字距缩窄；同时为防止路由转场时组件作用域样式缓存导致字体退回或样式丢失，将所有布局 CSS 完全整合至全局 `index.css`。
  - **完成标记**：`[x]`
  - **Commit ID**：`83a8c7f`

## 🐛 缺陷修复
- [x] **旅行与游戏页面的视频播放失败 (403 错误)**
  - **描述**：修复 [travel.astro](file:///d:/AntigravityWorkspace/self_blog/src/pages/travel.astro) 和 [gaming.astro](file:///d:/AntigravityWorkspace/self_blog/src/pages/gaming.astro) 中的 Mixkit 视频源被限制防盗链导致 403 的问题，使用稳定、开放的视频 CDN 替换。
  - **完成标记**：`[x]`
  - **Commit ID**：`85991ab`

- [x] **音乐馆默认时长显示问题**
  - **描述**：优化 [MusicPlayer.astro](file:///d:/AntigravityWorkspace/self_blog/src/components/MusicPlayer.astro) 页面首次加载时默认显示 `0:00` 的问题，改为显示 `--:--`，并在音频数据加载完成后再更新。
  - **完成标记**：`[x]`
  - **Commit ID**：`74402d7`

## 📹 视频与多媒体优化
- [x] **支持抖音视频卡片嵌入与播放**
  - **描述**：解析抖音分享短链提取视频 ID，并在 [VideoCard.astro](file:///d:/AntigravityWorkspace/self_blog/src/components/VideoCard.astro) 和 [VideoModal.astro](file:///d:/AntigravityWorkspace/self_blog/src/components/VideoModal.astro) 中集成 iframe 嵌入引擎，隐藏自定义控制器，在旅行栏目新增“自驾青甘大环线”卡片并支持无缝弹窗播放。
  - **完成标记**：`[x]`
  - **Commit ID**：`9043eaf` & `49833cd`
