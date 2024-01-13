---
layout: post
title: 用GitHub搭建一个jekyll博客
date:   2023-10-29
tags:
- 静态博客
- jekyll
comments: true
author: LineXic
---

# 前言

最近有人找我给他搞一个博客，但头疼的是他没有马内和手机号，我心想这还开屁啊
后来我在网上找了找后发现了这个不要服务器，零成本的博客搭建教程

# 优势和劣势
## 优势

无需手机号、身份证、服务器及域名
使用 [markdown](https://markdown.com.cn/ "markdown")  语法

## 劣势

编帖不方便，英文界面，改动不能立即同步

# 注册

既然用GitHub pages那么就要先注册一个GitHub账号
打开GitHub官网:[https://github.com](https://github.com )
并点击“Sign up”进行注册
[![注册GitHub](https://attach.klpbbs.com/forum/202205/21/122830l30aaazt1c8z8ata.jpeg "注册GitHub")](https://attach.klpbbs.com/forum/202205/21/122830l30aaazt1c8z8ata.jpeg "注册GitHub")

填好个人信息后，即可注册并进入主页

## 创建代码库

首先，点击“New”新建代码库
![代码库](https://attach.klpbbs.com/forum/202205/21/124336ixxyr3yyxryprxqk.jpeg "代码库")

然后，根据下面的图片完成代码库的初始化配置

![初始化](https://img-data.klpbbs.com:11179/forum/202205/21/124424nxi9b3v77hb3h3hd.jpeg "初始化")

第二步
![2](https://img-data.klpbbs.com:11179/forum/202205/21/124426wk5tazn2sa55nhkq.jpeg "2")

# Jekyll Themes
来到
[Jekyll Themes](http://jekyllthemes.org/ "Jekyll Themes")静态网页官网

[![pie6wjS.png](https://z1.ax1x.com/2023/10/29/pie6wjS.png)](https://imgse.com/i/pie6wjS)

点击download下载网页代码

如果点击homePages就到了他的GitHub仓库，demo是预览他搭建好的网站

# 上传代码

单击“Add file”，会看到两种添加文件的方式：
一种是“Create new file”（创建新文件）
另一种是“Upload files”（上传文件）

![](https://attach.klpbbs.com/forum/202205/21/131356rhrk5orhmnrzzo5a.jpeg)

这里就把你下载好的文件解压后计算机上传文件拖拽过去

# 制作GitHub Pages

文件创建完毕后，点击“Settings”

![](https://img-data.klpbbs.com:11179/forum/202205/21/130413dbiyybcuypbihckr.jpeg)

然后在菜单栏找到“Pages”

![](https://img-data.klpbbs.com:11179/forum/202205/21/130449qpnpmzlh090p08u3.jpeg)

会出现一个域名，那个域名就是你的个人网站
注意：代码库中必须含有“index.html”或“README.md”文件！

> 完成后输入你的GitHub账户名.github.io进入你的网址
模板是英文的，把它变成中文的话需要自己调试
博客文件在_Page里面
