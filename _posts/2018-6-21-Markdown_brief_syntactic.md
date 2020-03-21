---
layout: post
title: "Markdown 语法简明笔记"
date:   2018-6-21
tags: [markdown]
comments: true
author: lemonchann
toc: true
---
**Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。markdown是为那些需要经常码字或者进行文字排版的、对码字手速和排版顺畅度有要求的人群设计的，他们希望用键盘把文字内容打出来后就已经排版好了，最好从头到尾都不要使用鼠标。这些人包括经常需要写文档的码农、博客写手、网站小编、出版业人士等等** 参考[**百度百科**](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)

<!-- more -->

### markdown语法
开始学习markdown就有必要了解一下基本的语法，这里罗列一些基本的语法，这些语法是非常简单且常用的，能够帮助你快速掌握这门轻量的标记语言并且能够动手写自己的小博客，动手写起博客之后一些高级的用法可以边用边学。

- **标题样式**
在Markdown中，若一段文字被定义为标题，只要在这段文字前加 # 号即可。注意这里#号后面是有空格的。
>'# '一级标题， '## '二级标题， '### '三级标题
- **列表**
1. 无序列表使用`*`、+和-来做为列表的项目标记，这些符号是都可以使用的,注意符号与字符间**必须有一个空格**。
>* Candy.
>* Gum.
>* Booze.
>- Candy.
>- Gum.
>- Booze.
>+ Candy.
>+ Gum.
>+ Booze.

2. 有序的列表则是使用一般的数字接着一个英文句点作为项目标记：
>1. Red
>2. Green
>3. Blue 
- **目录**
>用`[TOC]`生成目录
- **加粗** 用双*号
>`**xxx**` **xxx**
- **引用** 由'>'开头
>`>`
- **斜体**单*号
>`*x*` *x*
- **删除线** 双波浪线
>`~~xx~~` ~~xx~~
- **分割线** 另起一行输入三个连续*
>`***` 

- **下划线** ++ 开头 ++结尾
>`++下划线++` ++下划线++

- **高亮标记** ==开头 ==结尾
>`==高亮标记==` ==高亮标记==

- **换行**  在末尾敲击两个以上空白，然后回车

- **插入链接**
>语法：`[链接说明](uri)`

- **插入图片**   
>语法: `![image](uri)` 语法上和插入链接只是多了个！ 插入图片的方法有很多种，csdn markdown提供插入图片功能，也可以注册各种图床（网上搜索说是七牛云最好用，没用过不发表）我这里说一种脑回路清奇的用GitHub当图床插入图片的方法。原链接参考[知乎](https://www.zhihu.com/question/21065229/answer/61070700?utm_medium=social&utm_source=wechat_session)   

- **插入表情**

> :smile: :smile_cat: 

### 以我的实践举个图片插入的栗子：

1. 将markdown需要用的图片放到git仓库中，发布到github上
2. 访问我的github仓库https://github.com/lemonchann/cloud_image
3. 访问图片cloud_image/Markdown语法简明笔记1.png 
4. 点 download 按钮，在地址栏可以复制图片地址，或者在Download按钮上直接右键 "复制链接地址"
5. 拷贝链接地址https://raw.githubusercontent.com/lemonchann/cloud_image/master/Markdown%E8%AF%AD%E6%B3%95%E7%AE%80%E6%98%8E%E7%AC%94%E8%AE%B01.png
6. 在Markdown中引用图片
7. 这是这篇博客我在markdown编辑器里的编辑的内容![Markdown语法简明笔记1](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2018-6-21-Markdown_brief_syntactic/Markdown%E8%AF%AD%E6%B3%95%E7%AE%80%E6%98%8E%E7%AC%94%E8%AE%B01.png)

  ![Markdown语法简明笔记2](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2018-6-21-Markdown_brief_syntactic/Markdown%E8%AF%AD%E6%B3%95%E7%AE%80%E6%98%8E%E7%AC%94%E8%AE%B02.png)
- **插入图片2**
> 图片还可以用相对路径的方法插入，必须和markdown文件相同目录下的文件或文件夹，但这种方法不适合写单篇的csdn或知乎文章，可以用于写书写个人博客。
> 语法示例：   
> `![pic](image/test.png) 或 ![pic](test.png)`

- **程序员必备代码段**  以三个 ` 开头带程序类型和 ``` 结尾，中间包含代码段
```c++
#include<iostream>
using namespace std;
class test
{
  int a;
  string str;
};
```
- **代码框** 用两个 ` 把代码框在中间就是代码段，也可以用于防止markdown语法生效（类似转义符）   

>`it is code`

- **表格**   

header 1 | header 2  
---|---   
row 1 col 1 | row 1 col 2  
row 2 col 1 | row 2 col 2



### 编辑器推荐

推荐编辑器

- typora，谁用谁知道。

- vscode+markdown



### 参考文章
- [Markdown: Basics （快速入门）](http://wowubuntu.com/markdown/basic.html)
- [Markdown中插入图片有什么技巧？](https://www.zhihu.com/question/21065229/answer/61070700?utm_medium=social&utm_source=wechat_session)

- [【进阶版】有道云笔记Markdown指南](http://note.youdao.com/iyoudao/?p=2445)
- [【简明版】有道云笔记Markdown指南](http://note.youdao.com/iyoudao/?p=2411)it