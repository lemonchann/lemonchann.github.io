---
layout: post
title: "玩转vscode支持PlantUML绘制预览流程图"
date: 2018-10-12
tags: [vscode]
comments: true
author: lemonchann
---

软件设计过程中，有好几种图需要画，比如流程图、类图、组件图等，我知道大部分人画流程图一般都会用微软的viso绘制，我之前也是这个习惯，viso画图有个不好的地方是需要时刻去调整线条和边框已达到简洁美观，今天我给大家介绍一款程序员画图神器PlantUML，一款你用了就爱上的画图软件！

VsCode以插件的形式支持了这款画图神器，还不知道VsCode？

> VsCode 强大地自定义功能，已经成为程序员最爱编辑器。   
> Microsoft在2015年4月30日Build 开发者大会上正式宣布了 Visual Studio Code 项目:一个运行于 Mac OS X、Windows和Linux之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。   

>  该编辑器也集成了所有一款现代编辑器所应该具备的特性，包括语法高亮(syntax high lighting)，可定制的热键绑定(customizable keyboard bindings)，括号匹配(bracket matching)以及代码片段收集(snippets)。Somasegar 也告诉笔者这款编辑器也拥有对 Git 的开箱即用的支持。引用[360百科](https://baike.so.com/doc/24428308-25261478.html)



## 主角出场

### PlantUML

**PlantUML是一个开源项目，支持快速绘制：**

>时序图
用例图
类图
活动图 (旧版语法在此处)
组件图
状态图
对象图
部署图 
定时图 

**同时还支持以下非UML图:**
>线框图形界面
架构图
规范和描述语言 (SDL)
Ditaa diagram
甘特图 
MindMap diagram 
以 AsciiMath 或 JLaTeXMath 符号的数学公式   

通过简单直观的语言来定义这些示意图,与MarkDown有相似的作用，这两种语言一个主要面向文本渲染一个主要用于图形绘制。
#### 语法
语法简单明了，查看以下[官方教程](http://plantuml.com/zh/sequence-diagram)   
**我截取几个官网的事例图片在这里：**

- 活动图
![活动图](https://i.loli.net/2019/11/21/GIBKdwfv2zCLH5y.png)
- 类图
![类图](https://i.loli.net/2019/11/21/KZz4F82AugpNckW.png)
- 时序图
![时序图](https://i.loli.net/2019/11/21/XIKTPifd6GmMB5Y.png)
- 用例图
![用例图](https://i.loli.net/2019/11/21/8nMHGwyV1lobCLz.png)
- 状态图
![状态图](https://i.loli.net/2019/11/21/6b9q2BXLyeZSIpD.png)

#### 图中的图片都是用源代码' '写'' 出来的哦！是不是很cool


### PlantUML遇上VsCode
#### 安装
- 安装graphviz-2.38.msi
- 安装2个vscode插件:
> PlantUML、Graphviz Preview

#### 例子
```plantUML
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```
#### 预览
> Alt+D

#### 文件格式
> .wsd, .pu, .puml, .plantuml, .iuml

#### 如何导出
> F1/ctrl+shift+p; PlantUML:导出当前图表；选择导出格式png；导出即可。



#### 好了，这么好用工具赶紧用起来吧！