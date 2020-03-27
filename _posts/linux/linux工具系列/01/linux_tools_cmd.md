工作5年，我总结了这些分析Linux进程的方法，全都告诉你。

进程是学计算机的人都要接触的基本概念，抛开那些纯理论的操作系统底层实现，在Linux下做软件开发这么多年，每次程序运行出现问题，都要一步一步分析进程各种状态，去排查问题出在哪里，这次lemon带你在Linux环境下实操，探究Linux进程的那些秘密。

## 何为进程

首先我们说下程序的概念，程序是一些保存在磁盘上的指令的有序集合，是静态的。进程是程序执行的过程，包括了动态创建、调度和消亡的整个过程，它是程序资源管理的最小单位。 

 线程是操作操作系统能够进行运算调度的最小单位。大部分情况下，它被包含在进程之中，是进程中的实际运作单位「引用维基百科」。一个进程内可以包含多个线程。



 

认识进程第一步，找到进程PID ( Process IDentity )。

## ps

`report a snapshot of the current processes.` 列出当前系统进程的一个快照报告。

最基本的当然是ps这个命令啦，这个大家应该都知道，小白别以为是Photoshop哈，不知道我下面给大家简单介绍一下，一般用法是`ps -ef`列出系统内经常信息，通常都会带管道`grep`出自己感兴趣的进程，像这样`ps -ef|grep intresting`第一列PID代表进程号，PPID（parent process ID）代表父进程号。

```
$ps -ef 
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0  2018 ?        00:04:22 /sbin/init
root         2     0  0  2018 ?        00:00:00 [kthreadd]
root         3     2  0  2018 ?        00:00:29 [ksoftirqd/0]
root         5     2  0  2018 ?        00:00:00 [kworker/0:0H]
root         7     2  0  2018 ?        00:02:05 [migration/0]
root         8     2  0  2018 ?        00:00:00 [rcu_bh]
root         9     2  0  2018 ?        00:00:00 [rcuob/0]
root        10     2  0  2018 ?        00:00:00 [rcuob/1]
```



认识进程第二步，让我看看你都交了哪些朋友（系统调用）。

## strace

`strace - trace system calls and signals`   跟踪进程内部的系统调用和信号 

`strace`后面跟着启动一个进程，你就可以跟踪启动后进程的系统调用和信号，有了这个命令可以看到进程执行时候都调用了哪些系统调用，通过指定不同的选项可以输出系统调用发生的时间，精度可以精确到微秒，甚至还可以统计分析系统调用的耗时，这在排查进程假死问题的时候很有用，能帮你发现进程卡在哪个系统调用上。已经在运行的进程也可以指定`-p`参数加`pid`像`gdb attach`那样附着上去跟踪。

>  什么是系统调用？**系统调用**（英语：system call），指运行在「用户态」的程序向操作系统「内核态」请求需要更高权限运行的服务。系统调用提供用户程序与操作系统之间的接口。 

```shell
$strace ./time_test
access("/usr/local/sa/agent/log/execOn", F_OK) = 0
readlink("/proc/3768/exe", "/usr/bin/strace", 2047) = 15
getuid()                                = 560
getppid()                               = 3767
open("/proc/3767/cmdline", O_RDONLY)    = 3
fstat(3, {st_mode=S_IFREG|0444, st_size=0, ...}) = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f78d088b000
read(3, "strace\0./time_test\0", 9216)  = 19
read(3, "", 9216)                       = 0
close(3)                                = 0
munmap(0x7f78d088b000, 4096)            = 0
getcwd("/data/linlongchen/test", 511)   = 23
ioctl(0, SNDCTL_TMR_TIMEBASE or TCGETS, {B38400 opost isig icanon echo ...}) = 0
readlink("/proc/self/fd/0", "/dev/pts/92", 4095) = 11
socket(PF_FILE, SOCK_DGRAM, 0)          = 3
fcntl(3, F_GETFL)                       = 0x2 (flags O_RDWR)
fcntl(3, F_SETFL, O_RDWR|O_NONBLOCK)    = 0
fcntl(3, F_GETFD)                       = 0
fcntl(3, F_SETFD, FD_CLOEXEC)           = 0
sendto(3, "\0\0\0\4\0\0\0\266\0\v./time_test\0\16./time_te"..., 182, 0, {sa_family=AF_FILE, path="/usr/local/sa/agent/log/agent_cmd.sock"}, 40) = 182
close(3)                                = 0
execve("./time_test", ["./time_test"], [/* 30 vars */]) = 0
brk(0)                                  = 0xe31000
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f5a3ac9a000
access("/etc/ld.so.preload", R_OK)      = 0
open("/etc/ld.so.preload", O_RDONLY)    = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=18, ...}) = 0
mmap(NULL, 18, PROT_READ|PROT_WRITE, MAP_PRIVATE, 3, 0) = 0x7f5a3ac99000
```

```
$strace -c ./time_test
time: 2020-03-26 20:20:17
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
  -nan    0.000000           0        10           read
  -nan    0.000000           0         1           write
  -nan    0.000000           0        42        32 open
  -nan    0.000000           0        11           close
  -nan    0.000000           0        12        12 stat
  -nan    0.000000           0        12           fstat
  -nan    0.000000           0         1           lseek
  -nan    0.000000           0        26           mmap
  -nan    0.000000           0        11           mprotect
  -nan    0.000000           0         4           munmap
  -nan    0.000000           0         3           brk
  -nan    0.000000           0         1           ioctl
  -nan    0.000000           0         2           access
  -nan    0.000000           0         1           socket
  -nan    0.000000           0         1           sendto
  -nan    0.000000           0         1           execve
  -nan    0.000000           0         4           fcntl
  -nan    0.000000           0         1           getcwd
------ ----------- ----------- --------- --------- ----------------

```



认识进程第三步，让我看看你带的小弟们（线程）。

## pstack

`print a stack trace of a running process` 打印出运行中程序的堆栈信息。

执行命令`pstack pid` 你能看到当前线程运行中的堆栈信息，其中的pid可用之前的`ps`命令获得，`pstack`可以看到进程内启动的线程号，每个进程内线程的堆栈内容也能看到。

```shell
$ pstack 11822
Thread 4 (Thread 0x7f1eab4ec700 (LWP 11838)):
#0  0x00007f1eb69a0bb3 in select () from /lib64/libc.so.6
Thread 3 (Thread 0x7f1eaaceb700 (LWP 11839)):
#0  0x00007f1eb69a0bb3 in select () from /lib64/libc.so.6
Thread 2 (Thread 0x7f1eaa4ea700 (LWP 11840)):
#0  0x00007f1eb69a9d23 in epoll_wait () from /lib64/libc.so.6
Thread 1 (Thread 0x7f1eb825c400 (LWP 11822)):
#0  0x00007f1eb69a9d23 in epoll_wait () from /lib64/libc.so.6
#1  0x000000000043ab14 in PollerWraper::WaitPollEvents (this=0x1ca4790, timeout=-1) at ../comm/pollwraper.cpp:11
```



看到上面打印出的LWP了吗，这里是个知识点， LPW是指`Light-weight process` 轻量级线程。引申知识：

> 1. Linux中没有真正的线程
> 2. Linux中没有的线程`Thread`是由进程来模拟实现的所以称作：轻量级进程
> 3. 进程是分配资源（资源管理）的最小单元，线程是调度资源（程序执行）的最小单元（这里不考虑协程） 



认识进程第四步，让小弟们（线程）出来排个队。

## pstree

`pstree - display a tree of processes` pstree按树形结构打印运行中进程结构信息

可以直观的查看进程和它启动的线程的关系，并能显示进程标识。

```
pstree -p 11822
query_test(11822)-+-{query_test}(11838)
                       |-{query_test}(11839)
                       `-{query_test}(11840)
```



认识线程第五步，是死（进程崩溃）是活（进程运行中）我都要知道你的秘密。

## gdb

gdb是GNU开发的gcc套件中Linux下程序调试工具，你可以查看程序的堆栈、设置断点、打印程序运行时信息，甚至还能调试多线程程序，功能十分强大。

在这里把gdb当成一个命令来讲有点大材小用了，要详细说gdb的话，完全可以撑起一篇文章的篇幅，这里长话短说，有机会再开一篇文章详细介绍下它。

### 使用

要用gdb调试C/C++程序首先编译的时候要加`-g`选项，`g++ -g test.cpp -o test`这样生成的程序就可以用gdb来调试啦。

1. 可以直接用gdb启动程序调试，命令：`gdb prog` 
2. 用gdb附着到一个已经启动的进程上调试也可以。命令：`gdb prog pid`
3. 程序崩溃之后参数corefile也可以用gdb调试，看看程序死掉之前留了什么遗言（堆栈信息）给你。命令：`gdb prog corefile`，这里有一点需要注意，有些Linux系统默认程序崩溃不生成`corefile`，这时你需要`ulimit -c unlimited`这样就能生成`corefile`了。

```shell
(gdb) attach 22861

(gdb) info threads // 查看线程信息, *代表当前调试的线程
  5 Thread 0x881fbb70 (LWP 22876)  0x007da424 in __kernel_vsyscall ()
  4 Thread 0x86ef8b70 (LWP 22877)  0x007da424 in __kernel_vsyscall ()
  3 Thread 0x864f7b70 (LWP 22878)  0x007da424 in __kernel_vsyscall ()
  2 Thread 0x85af6b70 (LWP 22879)  0x007da424 in __kernel_vsyscall ()
* 1 Thread 0x93a9c6d0 (LWP 22861)  0x007da424 in __kernel_vsyscall ()

(gdb) bt  //显示调用堆栈bt -- Print backtrace of all stack frames
#0  0x007da424 in __kernel_vsyscall ()
#1  0x05a1b996 in nanosleep () from /usr/local/lib/libc.so.6
#2  0x05a55aec in usleep () from /usr/local/lib/libc.so.6
#3  0x93ad4ad6 in WaitForExit () at test.cpp:242
#4  0x0807c5da in main (argc=1, argv=0xbffa92f4) at /test/main.cpp:58

(gdb) thread apply 1 bt //切换到线程1
Thread 1 (Thread 0x93a9c6d0 (LWP 22861)):
#0  0x007da424 in __kernel_vsyscall ()
#1  0x05a1b996 in nanosleep () from /usr/local/lib/libc.so.6
#2  0x05a55aec in usleep () from /usr/local/lib/libc.so.6
#3  0x93ad4ad6 in WaitForExit () at Vos.cpp:242
#4  0x0807c5da in main (argc=1, argv=0xbffa92f4) at /test/main.cpp:58
```



认识进程第六步，关于你的所有，我都想知道。

## 更近一步

通过/proc/pid文件了解进程的运行时信息和统计信息。/proc系统是一个伪文件系统，它只存在内存当中，而不占用外存空间，以文件系统的方式为内核与进程提供通信的接口。进入系统/proc目录：

![proc目录](F:\github\lemonchann.github.io\_posts\linux\linux工具系列\proc目录.png)

/proc目录下有很多以数字命名的目录，每个数字代表进程号PID它们是进程目录。系统中当前运行的每一个进程在/proc下都对应一个以进程号为目录名的目录/proc/pid，它们是读取进程信息的接口，我们可以进到这个文件里面，了解进程的运行时信息和统计信息。

### 高频使用统计

`/proc/pid`目录下的有一些重要文件，挑几个使用频率高的讲一讲。
`/proc/pid/environ` 包含了进程的可用环境变量的列表 。程序出问题了如果不确定环境变量是否设置生效，可以`cat`这个文件出来查看确认一下。

`/proc/pid/fd/` 这个目录包含了进程打开的每一个文件的链接。从这里可以查看进程打开的文件描述符信息，包括标准输入、输出、错误流，进程打开的`socket`连接文件描述符也能看到，`lsof`命令也有类似的作用。

`/proc/pid/stat`包含了进程的所有状态信息，进程号、父进程号、 线程组号、 该任务在用户态运行的时间 、 该任务在用内核态运行的时间、 虚拟地址空间的代码段、 阻塞信号的位图等等信息应有尽有。

### 其他统计

/proc/pid/cmdline 包含了用于开始进程的命令 
/proc/pid/cwd包含了当前进程工作目录的一个链接 
/proc/pid/exe 包含了正在进程中运行的程序链接
/proc/pid/mem 包含了进程在内存中的内容
/proc/pid/statm 包含了进程的内存使用信息




## reference

 https://man.linuxde.net/gdb 

 https://blog.csdn.net/dan15188387481/article/details/49450491 

 https://blog.csdn.net/m0_37925202/article/details/78759408 

https://blog.csdn.net/enweitech/article/details/53391567

