Linux服务端开发工作这5年，我把这些珍藏的linux命令告诉你

一般的Linux使用者只需要掌握基础操作命令即可，比如`cd`、`ls`、`rm`等，作为开发人员，如果你想成为一名Linux开发人员，不可避免的需要用到一些更高级的命令，作为后端开发人员，我总结了下面这些开发工作中，使用非常频繁的Linux命令，有了他们相信能帮你事半功倍，工具用的好，下班下的早。

## strace

`strace - trace system calls and signals`

strace后面跟着启动一个进程，你可以跟踪启动后进程的系统调用和信号，有了这个命令可以看到进程执行时候都调用了哪些系统调用，通过指定不同的选项可以输出系统调用发生的时间，精度可以精确到微秒，甚至还可以统计分析系统调用的耗时，这个用法排查问题的时候很有用，能帮你发现进程卡在哪个系统调用上。已经在运行的进程也可以指定`-p`参数加`pid`像`gdb attach`那样附着上去跟踪。

>  什么是系统调用？**系统调用**（英语：system call），指运行在用户空间]的程序向[操作系统内核请求需要更高权限运行的服务。系统调用提供用户程序与操作系统之间的接口。 

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
close(3)                                = 0
readlink("/proc/self/exe", "/data/linlongchen/test/time_test", 4096) = 32
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
  -nan    0.000000           0         3           readlink
  -nan    0.000000           0         1           getuid
  -nan    0.000000           0         1           getppid
  -nan    0.000000           0         1           arch_prctl
------ ----------- ----------- --------- --------- ----------------

```



## pstack

`print a stack trace of a running process`



