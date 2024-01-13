---
layout: post
title: 【termux】安装kali
date:   2023-11-4
tags: 
- kali
- termux
comments: true
author: LineXic
---
# 你需要准备的 
[termux](https://termux.dev/en/ "termux")（官网）

[termux](https://githubfast.com/termux/termux-app/releases/download/v0.118.0/termux-app_v0.118.0+github-debug_arm64-v8a.apkhttp://)（GitHub下载）

一双手，一部手机，一个键盘（不是

# 什么是kali 
Kali Linux 是专门用于渗透测试的Linux操作系统，它由BackTrack发展而来。在整合了IWHAX、WHOPPIX和Auditor这三种渗透测试专用Live Linux后，BackTrack正式改名为Kali LInux。

> 更详细的参考这篇文章，本文具体介绍如何安装：
[blog.csdn.net/article/...113239157](https://blog.csdn.net/qq_45740212/article/details/113239157 "blog.csdn.net/article/...113239157")

# 正文 

输入一下命令：

``` bash
apt update
```

这是一个主要在新系统安装之后或安装新软件包之前调用的命令，更新
![](https://img.linexic.top/file/fcec169b4c4bdc28e6692.png)

将软件包升级到最新版本：
 
``` bash
apt upgrade
```

![](https://img.linexic.top/file/997a7e8810ccbb902d011.png)

之后会选择yes或no，我们选择“Y“然后回车

![](https://img.linexic.top/file/5c703eff23100a60ae00e.png)

等待一会

![](https://img.linexic.top/file/0353798d81cbb65577657.png)

获得wget包信息

``` bash
apt update
```

![](https://img.linexic.top/file/be924391da4edae65d84c.png)

要拥有共享存储，您需要授予Termux存储访问权限。不允许访问外部连接的存储设备。

``` bash
termux-setup-storage
```

![](https://img.linexic.top/file/ac06eeb33eb0cb1765721.png)
安装wget，当系统询问您是否要继续时，请按Y并回车 

``` bash
apt install wget
```

![](https://img.linexic.top/file/90ac854bb0bc1172ab3ce.png)

当询问您“是否要继续”时，按Y并回车。

![](https://img.linexic.top/file/174877f0922981ab33a38.png)

下载NetHunter安装文件。确保输入正确的地址
 
``` bash
wget -O install-nethunter-termux https://offs.ec/2MceZWr
```

![](https://img.linexic.top/file/de3e7875b950eb41bf838.png)

更改权限以便可以执行文件

``` bash
chmod +x install-nethunter-termux
```

![](https://img.linexic.top/file/3cb3772ea606cb8178dbf.png)

键入以下命令以执行下载的安装文件：

``` bash
./install-nethunter-termux
```

![](https://img.linexic.top/file/c0eca379366d830ef94d1.png)

安装将需要一段时间，当要求删除rootfs时，输入N。

![](https://img.linexic.top/file/698982ac5796d86bf37cf.png)

>最后查看[kali官网](https://www.kali.org/ "kali官网")或者上网查询了解更多kali用法 
>以上所有图源来自[油管视频文档](https://m.youtube.com/watch?v=KxOGyuGq0Ts&t=186s "油管视频文档")
哔哩哔哩内的视频（搬运）
【你的下一台Kali，何必是电脑（无Root）（小白教程）-哔哩哔哩】 https://b23.tv/FQSWvCI
