---
layout: post
title: "玩转vscode支持Markdown预览"
date:   2019-6-12
tags: [markdown,vscode]
comments: true
author: lemonchann
---

Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。

<!-- more -->

### Markdown

Markdown具有一系列衍生版本，用于扩展Markdown的功能(如表格、脚注、内嵌HTML等等)，这些功能原初的Markdown尚不具备，它们能让Markdown转换成更多的格式，例如LaTeX，Docbook。Markdown增强版中比较有名的有Markdown Extra、MultiMarkdown、 Maruku等。这些衍生版本要么基于工具，如Pandoc;要么基于网站，如GitHub和Wikipedia，在语法上基本兼容，但在一些语法和渲染效果上有改动。来自[360百科](https://baike.so.com/doc/6949586-7171987.html)

### VsCode
强大地自定义功能，已经成为程序员最爱编辑器。   
Microsoft在2015年4月30日Build 开发者大会上正式宣布了 Visual Studio Code 项目:一个运行于 Mac OS X、Windows和Linux之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。   
该编辑器也集成了所有一款现代编辑器所应该具备的特性，包括语法高亮(syntax high lighting)，可定制的热键绑定(customizable keyboard bindings)，括号匹配(bracket matching)以及代码片段收集(snippets)。Somasegar 也告诉笔者这款编辑器也拥有对 Git 的开箱即用的支持。引用[360百科](https://baike.so.com/doc/24428308-25261478.html)

### MarkDown遇上VsCode
#### 有两种方法预览markdown渲染效果
* Ctrl+Shift+P 打开命令框输入Markdown即可匹配到一系列的MarkDown命令，选择其中的打开预览或打开侧边预览   
* 直接使用快捷键。打开侧边预览
> Ctrl+K 松开接 V
* 打开预览
>Ctrl+shift V

