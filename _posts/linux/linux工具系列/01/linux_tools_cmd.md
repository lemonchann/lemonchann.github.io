工作5年，资深程序员总结：分析Linux进程的6个方法，我全都告诉你

> 创作不易，点赞关注支持一下吧，我的更多原创技术分享，关注公众号「**后端技术学堂**」第一时间看！

操作系统「进程」是学计算机都要接触的基本概念，抛开那些纯理论的操作系统底层实现，在Linux下做软件开发这么多年，每次程序运行出现问题，都要一步一步分析进程各种状态，去排查问题出在哪里，这次lemon带你在Linux环境下实操，一步步探究揭开「Linux进程」的那些秘密。

## 何为进程 

首先我们说下「程序」的概念，程序是一些保存在磁盘上的指令的有序集合，是静态的。进程是程序执行的过程，包括了动态创建、调度和消亡的整个过程，它是程序资源管理的最小单位。 

线程是操作操作系统能够进行运算调度的最小单位。大部分情况下，它被包含在进程之中，是进程中的实际运作单位，一个进程内可以包含多个线程，是资源调度的最小单位。[引用维基百科]

![多线程程序模型](https://imgkr.cn-bj.ufileos.com/73d34b23-bb9d-4193-a496-b00eb036e05e.png)

> 探究进程第一步，你在吗？还好吗？

## ps

`report a snapshot of the current processes.` 列出当前系统进程的快照。

找到进程PID ( Process IDentity )，pid唯一标识一个进程。用`ps`这个命令，这个命令大家应该都知道吧，对于小白用户，首先他不是Photoshop。

![ps](http://ww1.sinaimg.cn/large/9150e4e5ly1frjcour2u8g203c02owej.gif)

给大家简单介绍一下，一般用法是`ps -ef`列出系统内经常信息，通常都会带管道`grep`出自己感兴趣的进程，像这样`ps -ef|grep intresting`第一列PID代表进程号，PPID（parent process ID）代表父进程号。
![ps输出实例](https://upload-images.jianshu.io/upload_images/7842464-be1e324fde371320.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 探究进程第二步，让我看看你都交了哪些朋友（系统调用 & 信号）

## strace

`trace system calls and signals`   跟踪进程内部的系统调用和信号 

> 什么是「系统调用」？系统调用（system call），指运行在「用户态」的程序向操作系统「内核态」请求需要更高权限运行的服务，系统调用提供用户程序与操作系统之间的接口。 

`strace`后面跟着启动一个进程，可以跟踪启动后进程的系统调用和信号，这个命令可以看到进程执行时候都调用了哪些系统调用，通过指定不同的选项可以输出系统调用发生的时间，精度可以精确到微秒，甚至还可以统计分析系统「调用的耗时」，这在排查进程假死问题的时候很有用，能帮你发现进程卡在哪个系统调用上。已经在运行的进程也可以指定`-p`参数加`pid`像`gdb attach`那样附着上去跟踪。
![strace](https://upload-images.jianshu.io/upload_images/7842464-3c9d2df36326b3bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![strace1](https://upload-images.jianshu.io/upload_images/7842464-45579c458ef59d88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 探究进程第三步，让我看看你带的小弟们（线程）。

## pstack

`print a stack trace of a running process` 打印出运行中程序的堆栈信息。

执行命令`pstack pid` 你能看到当前线程运行中的堆栈信息，其中的pid可用之前的`ps`命令获得，`pstack`可以看到进程内启动的线程号，每个进程内线程的「堆栈」内容也能看到。
![pstack](https://upload-images.jianshu.io/upload_images/7842464-4f5108a7bd0631e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


看到上面打印出的LWP了吗，这里是个知识点， LPW是指`Light-weight process` 轻量级线程。引申知识：

> 1. Linux中没有真正的线程
> 2. Linux中没有的线程`Thread`是由进程来模拟实现的所以称作：轻量级进程
> 3. 进程是「资源管理」的最小单元，线程是「资源调度」的最小单元（这里不考虑协程） 


> 探究进程第四步，让小弟们（线程）出来排个队吧。

## pstree

`display a tree of processes` pstree按树形结构打印运行中进程结构信息

可以直观的查看进程和它启动的线程的关系，并能显示进程标识。

![pstree](https://upload-images.jianshu.io/upload_images/7842464-779ee63317590602.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



> 探究进程第五步，是死（进程崩溃）是活（进程运行中）我都要知道你的秘密（堆栈帧 & 上下文）。
## gdb

gdb是GNU开发的gcc套件中Linux下程序调试工具，你可以查看程序的堆栈、设置断点、打印程序运行时信息，甚至还能调试多线程程序，功能十分强大。

在这里把gdb当成一个命令来讲有点大材小用，要详细说gdb的话，完全可以撑起一篇文章的篇幅，这里长话短说，有机会再开一篇文章详细介绍下它。

### 使用

要用gdb调试C/C++程序首先编译的时候要加`-g`选项，`g++ -g test.cpp -o test`这样生成的程序就可以用gdb来调试啦。

1. 可以直接用gdb启动程序调试，命令：`gdb prog` 
2. 用gdb附着到一个已经启动的进程上调试也可以。命令：`gdb prog pid`
3. 程序崩溃之后参数corefile也可以用gdb调试，看看程序死掉之前留了什么遗言（堆栈信息）给你。命令：`gdb prog corefile`，这里有一点需要注意，有些Linux系统默认程序崩溃不生成`corefile`，这时你需要`ulimit -c unlimited`这样就能生成`corefile`了。
![gdb调试](https://upload-images.jianshu.io/upload_images/7842464-ddc4bfc651297b49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 探究进程第六步，关于你的所有，我都想知道。

## 更近一步

通过`/proc/pid`文件了解进程的运行时信息和统计信息。`/proc`系统是一个伪文件系统，它只存在内存当中，而不占用外存空间，以文件系统的方式为内核与进程提供通信的接口。进入系统`/proc`目录：

![proc目录](https://upload-images.jianshu.io/upload_images/7842464-afef80294f10aa0d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


/proc目录下有很多以数字命名的目录，每个数字代表进程号PID它们是进程目录。系统中当前运行的每一个进程在/proc下都对应一个以进程号为目录名的目录`/proc/pid `，它们是读取进程信息的接口，我们可以进到这个文件里面，了解进程的运行时信息和统计信息。

### 高频使用

`/proc/pid`目录下的有一些重要文件，挑几个使用频率高的讲一讲。
`/proc/pid/environ` 包含了进程的可用环境变量的列表 。程序出问题了如果不确定环境变量是否设置生效，可以`cat`这个文件出来查看确认一下。

`/proc/pid/fd/` 这个目录包含了进程打开的每一个文件的链接。从这里可以查看进程打开的文件描述符信息，包括标准输入、输出、错误流，进程打开的`socket`连接文件描述符也能看到，`lsof`命令也有类似的作用。

`/proc/pid/stat`包含了进程的所有状态信息，进程号、父进程号、 线程组号、 该任务在用户态运行的时间 、 该任务在用内核态运行的时间、 虚拟地址空间的代码段、 阻塞信号的位图等等信息应有尽有。

### 其他统计

`/proc/pid/cmdline` 包含了用于开始进程的命令    
`/proc/pid/cwd`包含了当前进程工作目录的一个链接    
`/proc/pid/exe `包含了正在进程中运行的程序链接   
`/proc/pid/mem `包含了进程在内存中的内容   
`/proc/pid/statm `包含了进程的内存使用信息

## 总结一下
好了，一顿操作下来，你对进程和它背后的秘密你已经非常了解了，下次我们的好朋友「进程」如果遇到了什么问题（崩溃`coredump`、假死、阻塞、系统调用超时、文件描述符异常），你应该知道如何帮它处理了吧！我们来总结一下：

- ps查看进程id，看看进程还在不在以及进程状态
- 如果在的话`strace`、`psstack`看下进程当前信息，是不卡死在哪个位置，对比各帧最后调用信息找到异常点
- 如果进程不再了，如果有`corefile`文件，直接上`gdb`查看`corefile`信息
- 其他疑难杂症怀疑进程状态信息的时候，看看`/proc/pid`下面的进程状态信息，可能会给你启发。
- 最后，如果以上都不行，闭目祈祷吧！

![](http://wx1.sinaimg.cn/large/cf652d2bgy1fgchzezbpdj20k00k0dhe.jpg)

## 写在最后

今天的分享希望对你有帮助，祝大家写的服务永不宕机，从不coredump，让上面教你的操作吃灰去吧。
![永不宕机](https://upload-images.jianshu.io/upload_images/7842464-f7a94cc986f4ebb9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<div align="center"> 图片来源网络|侵删 </div>


最后，感谢各位的阅读。文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习。




## reference

 https://man.linuxde.net/gdb 

 https://blog.csdn.net/dan15188387481/article/details/49450491 

 https://blog.csdn.net/m0_37925202/article/details/78759408 

https://blog.csdn.net/enweitech/article/details/53391567



### 创作不易，点赞关注支持一下吧
我会持续分享软件编程和程序员那些事，欢迎关注。若你对编程感兴趣，我整理了这些年学习编程大约3G的资源汇总，关注公众号「**后端技术学堂**」后发送「**资料**」免费获取。