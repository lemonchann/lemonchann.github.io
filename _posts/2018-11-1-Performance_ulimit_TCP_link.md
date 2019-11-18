---
layout: post
title: "性能调优ulimit增加TCP连接最大限制"
date: 2018-11-1
tags: [vscode]
comments: true
author: lemonchann
---

## TCP连接数限制

Linux系统中tcp连接数是有最大限制的，即是进程可打开的最大文件描述个数，以下命令查看   
> ulimit -n

<!-- more -->

高负载的服务器通过修改ulimit参数达到合理规划用户使用资源和系统资源的目的。

## 用户级别

#### 修改最大连接数
1. 修改系统参数实现
> ulimit -SHn 65535   

> -H硬限制是实际的限制,-S软限制是warnning限制,只会做出warning.
如果运行ulimit命令修改的时候没有加上SH,就是两个参数一起改变.

2. 修改pam模块配置实现 
- session required /lib/security/pam_limits.so
- 修改/etc/security/limits.conf如下举例   

`* soft nofile 65536`   
`* hard nofile 65536`   
`*代表所有用户，当然也可以指定用户如root`

#### 确认修改是否生效
项目中遇到修改后虽然命令查看已经是修改后的值，但是进程连接的tcp个数还是系统默认的1024导致接入拒绝   

##### 查看进程实际的最大连接数
`cat /proc/进程pid/limits`  
`Max open files 就是当前进程的实际值`

## 系统级别
查看总的系统打开文件限制
> cat /proc/sys/fs/file-max

若要修改可以在rc.local加
> echo 你要的 > /proc/sys/fs/file-max




