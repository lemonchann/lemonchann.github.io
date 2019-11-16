---
layout: post
title: Linux启动流程
tags: Linux boot
categories: Linux
---


* TOC 
{:toc}

![](http://image.beekka.com/blog/201308/bg2013081708.png)

# 1.加载内核

操作系统接管硬件以后，首先读入`/boot `目录下的内核文件。

# 2.启动初始化进程

内核文件加载以后，就开始运行第一个程序`/sbin/init`，它的作用是初始化系统环境。

# 3.确定运行级别

许多程序需要开机启动。它们在Windows叫做"服务"（service），在Linux就叫做"守护进程"（daemon）。

init进程的一大任务，就是去运行这些开机启动的程序。但是，不同的场合需要启动不同的程序，比如用作服务器时，需要启动Apache，用作桌面就不需要。Linux允许为不同的场合，分配不同的开机启动程序，这就叫做"`运行级别`"（runlevel）。也就是说，启动时根据"运行级别"，确定要运行哪些程序。

Linux预置七种运行级别（0-6）。

* 0是关机，

* 1是单用户模式（也就是维护模式），

* 6是重启。

* 运行级别2-5，各个发行版不太一样，对于Debian来说，都是同样的多用户模式（也就是正常模式）。

init进程首先读取文件 /etc/inittab，它是运行级别的设置文件。第一行内容：
	
	id:2:initdefault:

initdefault的值是2，表明系统启动时的运行级别为2。

每个运行级别在/etc目录下面，都有一个对应的子目录，指定要加载的程序。
	
	/etc/rc0.d 
	/etc/rc1.d
	/etc/rc2.d
	/etc/rc3.d
	/etc/rc4.d
	/etc/rc5.d
	/etc/rc6.d
	　　
"rc"表示run command（运行程序），"d"表示directory（目录）	。

/etc/rc2.d中指定的程序：

	$ ls  /etc/rc2.d
	README
	S01motd
	S13rpcbind
	S14nfs-common
	S16binfmt-support
	S16rsyslog
	S16sudo
	S17apache2
	S18acpid
	...　

除了第一个文件README以外，其他文件名都是"字母S+两位数字+程序名"的形式。

* 字母`S`表示Start，也就是启动的意思（启动脚本的运行参数为start），如果这个位置是字母`K`，就代表Kill（关闭），即如果从其他运行级别切换过来，需要关闭的程序（启动脚本的运行参数为stop）。

* 后面的两位数字表示处理顺序，数字越小越早处理，所以第一个启动的程序是motd，然后是rpcbing、nfs......数字相同时，则按照程序名的字母顺序启动，所以rsyslog会先于sudo启动。

# 4.加载开机启动顺序

七种预设的"运行级别"各自有一个目录，存放需要开机启动的程序。如果多个"运行级别"需要启动同一个程序，那么这个程序的启动脚本，就会在每一个目录里都有一个拷贝。这样会造成管理上的困扰：如果要修改启动脚本，岂不是每个目录都要改一遍？

Linux的解决办法，就是七个 /etc/rcN.d 目录里列出的程序，都设为`链接文件`，指向另外一个目录 /etc/init.d ，真正的启动脚本都统一放在这个目录中。init进程逐一加载开机启动程序，其实就是运行这个目录里的启动脚本。

这样做的另一个好处，就是如果你要手动关闭或重启某个进程，直接到目录 /etc/init.d 中寻找启动脚本即可。

比如，我要重启Apache服务器，就运行下面的命令：
	
	$ sudo /etc/init.d/apache2 restart
	
/etc/init.d 这个目录名最后一个字母d，是directory的意思，表示这是一个目录，用来与程序 /etc/init 区分。

# 5.用户登陆

用户的登录方式有三种：

* 命令行登录

init进程调用getty程序（意为get teletype），让用户输入用户名和密码。输入完成后，再调用login程序，核对密码（Debian还会再多运行一个身份核对程序/etc/pam.d/login）。如果密码正确，就从文件 /etc/passwd 读取该用户指定的shell，然后启动这个shell。

* ssh登录

系统调用sshd程序（Debian还会再运行/etc/pam.d/ssh ），取代getty和login，然后启动shell。

* 图形界面登录

init进程调用显示管理器，Gnome图形界面对应的显示管理器为gdm（GNOME Display Manager），然后用户输入用户名和密码。如果密码正确，就读取/etc/gdm3/Xsession，启动用户的会话。

# 6.进入 login shell

Debian默认的shell是Bash，它会读入一系列的配置文件，不同的登陆方式加载不同的配置文件

* 命令行登录：首先读入 /etc/profile，这是对所有用户都有效的配置；然后`依次`寻找下面三个文件，这是针对当前用户的配置。
	
		~/.bash_profile
		~/.bash_login
		~/.profile　　

`*`需要注意的是，这三个文件只要有一个存在，就不再读入后面的文件了。

* ssh登录：与命令行登录完全相同。

* 图形界面登录：只加载 /etc/profile 和 ~/.profile。~/.bash_profile 不管有没有，都不会运行。

# 7.打开 non-login shell

进入 login shell完成后，Linux的启动过程就算结束了。

用户进入操作系统以后，常常会再手动开启一个shell。这个shell就叫做 non-login shell，意思是它不同于登录时出现的那个shell，不读取 /etc/profile 和 ～/.profile 等配置文件。

non-login shell 是用户最常接触的shell，它会读入用户自己的bash配置文件 ~/.bashrc。大多数时候，我们对于bash的定制，都是写在这个文件里面的。

`*` 如果不启动 non-login shell ， ～/.bashrc 照样会运行，文件 ~/.profile 中存在下面的代码

~~~
　　if [ -n "$BASH_VERSION" ]; then
　　　　if [ -f "$HOME/.bashrc" ]; then
　　　　　　. "$HOME/.bashrc"
　　　　fi
　　fi
~~~

因此，只要运行～/.profile文件，～/.bashrc文件就会连带运行，但是如果存在～/.bash_profile文件，那么有可能不会运行～/.profile文件。解决办法是把下面代码写入 ～/.bash_profile，让 ～/.profile 始终能够运行。


~~~
　　if [ -f ~/.profile ]; then
　　　　. ~/.profile
　　fi
~~~
