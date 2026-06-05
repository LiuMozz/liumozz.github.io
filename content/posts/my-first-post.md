---
title: "我的第一篇博客：基于 Hugo + PaperMod 的新旅程"
date: 2026-06-05T16:50:00+08:00
lastmod: 2026-06-05T16:50:00+08:00
author: "LiuMozz"
tags: ["Hugo", "GitHub Pages", "建站"]
categories: ["技术"]
description: "记录我使用 Hugo 和 PaperMod 主题搭建个人博客的过程和心得。"
weight: 1
draft: false
showToc: true
TocOpen: true
---

## 欢迎来到我的博客！

这是我使用 **Hugo** 和 **PaperMod** 主题搭建的个人博客。在这里，我会记录自己的开发日常、技术学习笔记以及对生活的思考。

### 为什么选择 Hugo + PaperMod？

1. **极速构建**：Hugo 是目前世界上最快的静态网站生成器，几毫秒内即可渲染出成百上千张页面。
2. **极简优雅**：PaperMod 主题排版干净，设计克制，让读者专注于内容本身。
3. **功能完备**：自带暗黑模式切换、全站搜索、代码块复制、目录树等实用功能。
4. **免费托管**：借助 GitHub Pages 和 GitHub Actions，完全不需要购买服务器，即可拥有自己的全球可访问网站。

---

### 代码高亮展示

PaperMod 对各种编程语言的代码块高亮支持非常友好，以下是一个简单的 Python 排序示例：

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# 测试排序
my_list = [64, 34, 25, 12, 22, 11, 90]
print("排序前:", my_list)
print("排序后:", bubble_sort(my_list))
```

### 未来计划

- [ ] 分享日常遇到的 Bug 和解决方案。
- [ ] 撰写深入的框架/技术解析文章。
- [ ] 记录一些非技术类的读书笔记与随笔。

感谢你的阅读！期待在这里与你交流。
