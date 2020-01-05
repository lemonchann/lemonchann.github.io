---
layout: post
title: "后台开发C++学习路线技能加点"
date:   2020-1-1
tags: [c++]
comments: true
author: lemonchann
---

最近经常被邀请回答一些如何学习C++和C++后台开发应该具体储备哪些基础技能的问题。所以写这篇文章，总结自己的C++后台开发学习路径，分享具体有哪些技能树是必须要点的，希望能给后来想从事后台开发的同学一点参考，能帮你少走些弯路就更好。工欲善其事必先利其器，好的书籍能让学习事半功倍，所以每个技能点之后我会推荐一些书，都是我读过且口碑不错的书，供参考。

分享的是我的学习路径，如果你也能顺着这个学习路径认真学一遍，我想通过大部分大厂面试是没有问题的。

## 计算机基础综合

考过CS或者软件工程研究生的同学可能对这个标题`计算机专业基础综合` 不陌生，是的，我说的就是专业课代号408的**计算机基础综合**。这门专业课包含：数据结构、计算机组成原理、计算机网路、操作系统。

为什么提起这门课程呢，因为基础知识太重要了！这是科班区别于培训班的最大不同，理论知识不一定马上能用于项目上，但当与人讨论起某个技术问题时你能够知道它深层次的原因，看问题的角度会更加全面和系统。

打个比方，你可能听过堆栈的名词，但知道它的具体结构和不同吗？学完数据结构就明白了；你知道计算机会算加减乘除，但具体是如何实现的呢？组成原理会告诉你；知道程序执行的时候怎么区分指令地址和数据地址的吗？操作系统会告诉你答案。

所以，如果你大学不是计算机相关专业，或者是本专业但是没有好好学习基础的话，强烈建议你务必抽时间好好学习这几门课程。

#### 推荐书：

**计算机基础综合**推荐看大学的计算机专业教材就可以：数据结构、计算机组成原理、计算机网路、操作系统。

- 数据结构 

> 1.教材：[《数据结构》](https://www.baidu.com/s?wd=《数据结构》&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)[严蔚敏](https://www.baidu.com/s?wd=严蔚敏&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) 清华大学出版社 
>
> 2.辅导书：《算法与数据结构考研试题精析（第二版）》[机械工业出版社](https://www.baidu.com/s?wd=机械工业出版社&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) 

- 计算机组成原理  

> 教材：[《计算机组成原理》](https://www.baidu.com/s?wd=《计算机组成原理》&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)[唐朔飞](https://www.baidu.com/s?wd=唐朔飞&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) [高等教育出版社](https://www.baidu.com/s?wd=高等教育出版社&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) 
>
> 辅导书：
>
> [《计算机组成原理考研指导》](https://www.baidu.com/s?wd=《计算机组成原理考研指导》&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)徐爱萍 清华大学出版社 
>
> 《计算机组成原理--学习指导与习题解答》[唐朔飞](https://www.baidu.com/s?wd=唐朔飞&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao) [高等教育出版社](https://www.baidu.com/s?wd=高等教育出版社&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)  

- 操作系统 

> 教材：[《计算机操作系统(修订版)》](https://www.baidu.com/s?wd=《计算机操作系统(修订版)》&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)汤子瀛 [西安电子科技大学出版社](https://www.baidu.com/s?wd=西安电子科技大学出版社&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)  
>
> 辅导书：《操作系统考研辅导教程(计算机专业研究生入学考试全真题解) 》电子科技大学出版社 
>
> 《操作系统考研指导》清华大学出版社 

- 计算机网络 

> 教材：《计算机网络(第五版)》谢希仁 电子工业出版社  
>
>  辅导书：《计算机网络知识要点与习题解析》哈尔滨工程大学出版社 

#### 视频教材

看上面的课本教程估计非常枯燥，下面是我觉得讲的不错的国内大学公开课我听过一部分，讲的都是计算机专业的基础内容，如果你没有系统的学过或者学的不好，都是非常建议刷一遍视频课的。

[武汉大学-数据结构 MOOC网络课程 ](https://www.icourse163.org/course/WHU-1001539003)

[华中科技大学-计算机组成原理](https://www.icourse163.org/course/HUST-1003159001)

[电子科技大学-计算机组成原理](https://www.icourse163.org/course/UESTC-1001543002)

[华中科技大学-操作系统原理](https://www.icourse163.org/course/HUST-1003405007)

[哈尔滨工业大学-计算机网络](https://www.icourse163.org/course/HIT-154005)

**这一小节写的有点多，因为基础实在是太重要了！科班和非科班的差距不是谁学的编程语言多，也不是谁框架用的溜，本质区别是理论知识储备差别和用CS思维独立思考分析解决问题的能力。**



## C++和C语法基础

> 学任何语言首先要懂的都是他的语法，C++的基础语句和语法和C是很像的，最大的不同在class和异常处理机制，还有模板的应用，所以有C基础语法学起来是很快，没有C基础也没关系，啃完下面推荐的书也差不多，光说不练假把式，看完之后趁热把课后习题敲一遍并且自己编译通过才算看完。

#### 推荐书：

[《C++ Primer 中文版（第 5 版)》](https://book.douban.com/subject/25708312/) 经典的入门书籍，不要拿大学教材XX强来对比，不是一个等级。

## 标准库STL学习

> C++标准库提供了包括最基础的标准输入输出`iostrem`、各种容器`vector、set、string` 这些都是需要熟练掌握的。

#### 推荐书：

[《C++ Primer 中文版（第 5 版)》](https://book.douban.com/subject/25708312/)



## C++进阶

> 学完了C++基础你就能够在项目中用起来了，但是距离用好还有很大一段距离。不过没关系，你没踩过的坑前人已经踩过一遍，关于一些语言细节和更好的编码习惯有很多优秀的书籍可以查阅。站在巨人的肩膀上写出更健壮高效的代码。

#### 推荐书

[《Effective C++》](https://book.douban.com/subject/1842426/) 改善程序与设计的55个具体做法，非常值得一看，老手和新手的差别由此产生！

[《More Effective C++（中文版》](https://book.douban.com/subject/5908727/)

>  同一个作者，继Effective C++之后，Scott Meyers于1996推出这本《More Effective C++(35个改善编程与设计的有效方法)》“续集”。条款变得比较少，页数倒是多了一些，原因是这次选材比“一集”更高阶，尤其是第5章。Meyers将此章命名为技术。

[《Inside the C++ Object Model》](https://book.douban.com/subject/1484262/) 这本书还有中文版本，翻译质量也很高[《深度探索C++对象模型》](https://book.douban.com/subject/1091086/)



## C++11新标准



## Linux系统基础和shell script

> 如今**几乎**所有的互联网服务都是跑在linux系统上面的，如果你还对这个系统一无所知那更加谈不上后台开发了，所以要先学习linux系统操作，不如**文件管理，系统命令，文件系统，权限管理，系统服务**等等。
>
> 至于shell script 就类似win的批处理脚本，相信我，你在linux下干活早晚会需要它，所以趁早系统学起来。

#### 推荐书：

[《鸟哥的Linux私房菜基础学习篇》](https://book.douban.com/subject/4889838/) 这个系列还有一个服务器架设篇，前期学习个人感觉没必要看

[《Linux Shell脚本攻略》](https://book.douban.com/subject/6889456/)

[《Shell脚本学习指南》](https://read.douban.com/ebook/124173616/?dcs=subject-rec&dcm=douban&dct=6889456)



## Linux环境高级编程

> 如果说linux系统基础是打基础，那么打完基础之后就要学习一些更高级的技巧。上一阶段你已经能够完成熟练操作Linux系统，知道一些**常规的系统命令和服务，并且能够利用shell script写一些小工具**提高日常开发效率。
>
> 我们的目标是星辰大海，你还需要更加深入的掌握linux系统编程技巧，**学习系统编程接口、系统调用api、网络编程套接字、进程间通信（IPC）**，这是本阶段的学习目的。

#### 推荐书：

[《UNIX环境高级编程》](https://book.douban.com/subject/1788421/) 这本是linux编程必看的APUE，强烈推荐通读一遍，后续值得反复翻阅。

[《Linux/UNIX系统编程手册》](https://book.douban.com/subject/25809330/) 这本书和APUE有点重复，我看完APUE这本就跳着看了，平常可以看目录查阅。



## Linux网络编程套接字

> 在同一台机器上进程间的通信（IPC）有多种方式，可以是通过**消息队列、FIFO、共享内存**等方式。网络编程套接字是指：分布在不同机器上的程序通过系统提供的网络通信接口，跨越网络将不同机器上的进程连接起来，实现跨机器的网络通信。一般有**UDP套接字、TCP套接字、Unix Domain，当然，如果你是通信从业者对SCTP套接字肯定也不会陌生。**

#### 推荐书：

[《UNIX网络编程 卷1：套接字联网API（第3版）》](https://book.douban.com/subject/4859464/)

[《UNIX网络编程 卷2：进程间通信（第2版）》](https://book.douban.com/subject/26434599/) 



## 数据库和存储

> 程序运行时数据都在内存当中，一个后台服务系统一般来说都需要考虑数据落地的问题，这时就会涉及到数据库选型问题。数据库分为关系型数据库和非关系型数据库。
>
> **关系型数据库：指采用了关系模型来组织数据的数据库，代表是MySql。
> 关系模型指的就是二维表格模型，而一个关系型数据库就是由二维表及其之间的联系所组成的一个数据组织。**
>
> **非关系型数据库以键值对存储，且结构不固定，每一个元组可以有不一样的字段，每个元组可以根据需要增加一些自己的键值对，不局限于固定的结构，可以减少一些时间和空间的开销。代表有redis、memcached，腾讯内部组件ckv也是非关系型数据库**。

#### 推荐书：

[《SQL必知必会》](https://book.douban.com/subject/24250054/)

[《高性能MySQL》](https://book.douban.com/subject/23008813/)

[redis官方文档](https://redis.io/documentation)  [redis中文网](http://redis.cn/) 

关于redis还有很多应用，比如基于redis的分布式锁的应用，高并发抢红包模型等，这个后面可以再写一篇文章。

