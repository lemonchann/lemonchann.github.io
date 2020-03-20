---
layout: post
title: "推荐一款github代码在线浏览神器sourcegraph"
date:   2020-1-27
tags: [后台开发]
comments: true
author: lemonchann
---

程序员逛github已经是每日必须项目，看到感兴趣的项目都会点进去看一下，github全球最大的同性交友平台，这里有海量的开源代码库，作为开源代码管理平台github是非常专业的。

但是，你要在上面看代码就不是那么舒服了，特别是点进去每个文件夹浏览文件非常的不方便，大工程文件之间的切换有时候网页加载特别慢非常不方便。

推荐这款我用的这款Google浏览器插件，安装之后让在线浏览github项目源码，查找引用和定义如同在IDE看代码一样，体验如丝滑般舒爽。

## 安装

进入[Google应用商店](https://chrome.google.com/webstore/category/extensions?utm_source=chrome-ntp-icon) 搜索sourcegraph下载安装插件，如下图：

![应用商店.png](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E5%BA%94%E7%94%A8%E5%95%86%E5%BA%97.png)

点击，**添加至Chrome**，即可在项目中使用。



## 使用

打开github上任意一个项目，点击项目上方的Sourcegraph图标，即可进入代码浏览界面。

![启动插件.png](https://i.loli.net/2020/02/21/LpWeAxXIC4hDr73.png)

代码浏览界面的左侧是代码目录结构，就跟一般的IDE工程视图一样，你可以很轻松的在各个文件夹中查看文件，不用像在github那样来回前进后退，望着网页加载进度发呆。

![工程文件浏览](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E5%B7%A5%E7%A8%8B%E6%96%87%E4%BB%B6%E6%B5%8F%E8%A7%88.png)

鼠标单击相应的函数，出现的选项框可以选择跳转到定义

![查找定义](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E6%9F%A5%E6%89%BE%E5%AE%9A%E4%B9%89.png)

也可选择查找所有引用

![查找引用](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E6%9F%A5%E6%89%BE%E5%BC%95%E7%94%A8.png)



## 离线安装

鉴于有些同学由于众所周知的原因，不方便去Google应用商店下载，这里再说说离线安装的方法

- 进入Chrome插件中心，浏览器输入 [chrome://extensions/](chrome://extensions/)
- 打开开发者模式开关

![插件中心](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E6%8F%92%E4%BB%B6%E4%B8%AD%E5%BF%83.png)

- 下载我提供的插件安装包 `20.2.5.1810_0.rar` ，安装包在公众号【柠檬的编程学堂】回复【插件】获取，解压放到插件文件夹路径，比如我的路径：

  `C:\Users\替换成你的电脑用户名\AppData\Local\Google\Chrome\User Data\Default\Extensions`

- 打开浏览器插件中心，打开 **开发者模式**，选择 **加载已解压的扩展程序**，即可完成安装。

  ![加载扩展程序](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2020-2-21-sourcegraph/%E5%8A%A0%E8%BD%BD%E6%89%A9%E5%B1%95%E7%A8%8B%E5%BA%8F.png)



以上，这款好用的插件分享给大家，愉快的在github玩耍吧！



