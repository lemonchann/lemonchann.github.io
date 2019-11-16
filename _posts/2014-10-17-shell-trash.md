---
layout: post
title: 告别rm,自制回收站
tags: trash shell Linux script
categories: linux
---

常在河边走，哪有不湿鞋？命令敲多了，总会手欠的，笔者刚在不久前尝到了`rm`命令带来的苦果，于是一怒之下决定自制一个回收脚本，从此告别rm命令。

因为rm是落子无悔的，所以网上有一种做法是自制一个shell脚本，封装一些mv操作，并用这个新脚本替换原来的rm命令。本人不太赞成这种做法，一是因为rm是系统默认的命令，已经是一种事实上的标准，若胡乱改动其功能，难免会对依赖这个命令的程序造成影响；二是因为，改变了rm的删除行为后，系统就失去了彻底删除一个文件的能力，为了弥补又必须考虑从回收站中彻底删除文件的情形,反而将简单问题复杂化了。

我的做法非常简单，回收脚本直接作为一个新命令，使用的时候想删除就删除，想回收就回收，连从回收站恢复的功能都不需要，想恢复文件，自己用mv从回收站移出来就行了。

~~~
# !/bin/bash

readonly trash_home=/tmp/trash

for target in "$@" 
do
	dest=${trash_home}`realpath $target | xargs dirname`
	
	if [ ! -e ${dest} ]; then 
		mkdir -p ${dest};
	fi

	if [ -d $target ]; then
		mv -i $target ${dest};
	elif [ -f $target ]; then
		mv -i $target ${dest};
	fi
done
~~~

在`/etc/profile.d`目录新建文件`trash`，将以上代码粘贴进去，然后赋予其可执行权限。

命令运行效果应该如此：

![trash][trash]

[trash]: {{"/shell-trash.png" | prepend: site.imgrepo }}

