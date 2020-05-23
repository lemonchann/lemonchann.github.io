前面几周陆陆续续写了一些后端技术的文章，包括数据库、微服务、内存管理等等，我比较倾向于成体系的学习，所以数据库和微服务还有后续系列文章补充。

最近工作上比较多的 Golang 编程，现在很多互联网公司都在转向 Golang 开发，所以打算写一写有关 Go 语言学习的系列文章，目标是从 Go 基础到进阶输出一系列文章，沉淀下这些知识同时也给大家做参考，力求做到通俗易懂，即使你是 `Golang` 小白也能看懂，如果你是老手也能温故知新。

本文将要和你分享 linux 下安装 Golang 环境，并且讲解如何通过配置 VSCode 远程开发调试 Golang 程序。

## 下载源码

你可以用系统自带的包管理工具比如 `yum` 或 `apt-get` 来安装Golang开发环境。不过，为了通用性，我选择通过源码的方式来安装和讲解，在官网下载源码，下载地址  https://golang.org/dl/  

![官方下载界面](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\官方下载界面.png)



## 手动安装

### 解压安装

我这里下载下来的源码包 `go1.14.2.linux-amd64.tar.gz` 放到远程 Linux 服务器目录下。执行以下命令安装到 /usr/local 目录。

```
tar -zxvf -C /usr/local/ `go1.14.2.linux-amd64.tar.gz`
```



### 创建工作空间

工作空间是你Go项目的「工作目录」，挑选一个合适目录，执行下面操作：

```shell
mkdir GoPath
mkdir -p GoPath/src
mkdir -p GoPath/bin
mkdir -p GoPath/pkg
```

三个目录含义：

```css
  src: 源码路径（例如：.go、.c、.h、.s 等）
  pkg: 编译包时，生成的.a文件存放路径
  bin: 编译生成的可执行文件路径
```



### 配置环境变量

安装过程中有这么几个环境变量需要配置，先来了解一下：

GOROOT：Go的安装路径，也就是前面我们解压到的目录 `/usr/local/go`。

GOBIN：Go项目的二进制文件存放目录。

GOPATH：Go的工作空间。前面有介绍的工作空间目录。

在 `/etc/profile` 文件追加以下内容完成设置。

```shell
export GOROOT=/usr/local/go
export GOPATH=/yourpath/GoPath # 设置你自己的GoPath路径 
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOROOT/bin  # 加入到PATH环境变量
export PATH=$PATH:$GOPATH/bin
```

```shell
# source /etc/profile #立即生效
```

### 验证安装

```shell
# go version  #检查版本
# go version go1.14.2 linux/amd64 # 输出版本号
```

如果看到版本信息就代表安装成功了！

## 远程开发

上面我们在 Linux 环境下安装好了 Golang 开发环境，但我不想每次打开终端登录服务器编写调试程序，怎么才能在本地PC开发调试Golang程序呢？

看过我上一篇Vscode远程开发的小伙伴应该能想到方法，我们就要用Vscode搭建Golang远程开发环境。具体的远程开发配置可以查看我的另一篇文章。

### Golang开发插件

首先安装官方推荐的 Go 开发插件，如下，点他安装。

![Go插件](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\Go插件.png)

接着还会出现如下的提示，是因为缺少其他 Go 开发相关插件，点 `install all` 全都装上就行。

![安装所有插件](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\安装所有插件.png)



## Hello World

编程界有个惯例，什么语言开始学习都是从 Hello World 开始。现在，我们就用 Golang 编写第一个 `HelloWorld` 程序吧。

上代码：

```go
package main // 所有Go程序从main包开始运行

import "fmt" // 导入fmt包

func main() {
	fmt.Print("hello world", " i am ready to go :)\n")
	fmt.Println("hello world", "i am ready to go :)")
}
```
### 格式化 包

`fmt` 实现了类似 C++/C 语言的格式IO库功能。

`Print` 和 `Println` 都可用于打印输出，但是功能略有不同。可以看到我在`Print` 函数中，对后一个字符串加了空格和换行符，这样两个打印出来的结果是相同的。

### Print

```
func Print(a ...interface{}) (n int, err error)
```

Print采用默认格式将其参数格式化并写入标准输出。如果两个相邻的参数都不是字符串，会在它们的输出之间添加空格。返回写入的字节数和遇到的任何错误。

### Println

```
func Println(a ...interface{}) (n int, err error)
```

Println采用默认格式将其参数格式化并写入标准输出。总是会在相邻参数的输出之间添加空格并在输出结束后添加换行符。返回写入的字节数和遇到的任何错误。

## 调试

### 终端调试

在终端命令行源码所在目录输入`go run` 运行程序。

```shell

# go run HelloWorld.go 
//输出
hello world i am ready to go :)
hello world i am ready to go :)
```

也可以先编译`go build` 得到可执行文件后再运行。

```shell
# go build HelloWorld.go 
# ls
HelloWorld  HelloWorld.go
# ./HelloWorld 
hello world i am ready to go :)
hello world i am ready to go :)
```



### Vscode调试

按`F5`启动调试，编辑与调试控制台输出如下：

![Vscode调试](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\Vscode调试.png)



## 命令行参数获取

命令行参数可以通过`os` 包的 `Args` 函数获取，代码如下：

```go
package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 命令行参数获取，os.Args第一个参数是程序自身
	fmt.Println(os.Args)
	for idx, args := range os.Args {
		fmt.Println("参数"+strconv.Itoa(idx)+":", args)
	}
}
```

### 终端设置


以下是带参数argv1 argv2 运行golang程序和输出。
```shell
# go run basic.go argv1 argv2 

# 输出
[/tmp/go-build441686724/b001/exe/basic argv1 argv2]
参数0: /tmp/go-build441686724/b001/exe/basic
参数1: argv1
参数2: argv2
```



### VSCode设置

launch.json文件的 `args` 属性配置可以设置程序启动调试的参数。

![vscode命令行参数设置](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\vscode命令行参数设置.png)

设置之后，按`F5` 启动调试，就会在调试控制台输出配置的参数。

![vscode带参数调试输出](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\vscode带参数调试输出.png)



## 环境变量获取

命令行参数可以通过`os` 包的 `Getenv` 函数获取，代码如下：

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 获取环境变量
	fmt.Println(os.Getenv("type"), os.Getenv("name"), os.Getenv("GOROOT"))
}

```



### VSCode设置环境变量

`launch.json` 文件的 `args` 属性配置可以设置 VSCode 调试的 Golang 程序环境变量。

设置的格式是：name:vaule 形式，注意都是字符串。

![vscode环境变量设置](F:\github\lemonchann.github.io\_posts\go\tour_go\环境配置\vscode环境变量设置.png)



### 终端设置环境变量

终端的环境变量设置就是可以用 Linux 的 `export` 命令设置，之后就可以用 `os.Getenv` 函数读取。

比如我们最初设置 `GOROOT` 环境变量的命令

```export GOROOT=/usr/local/go```

就可以用 `os.Getenv("GOROOT") ` 读取。比较简单，这里就不多说了。

## 总结

现在，你有了一个可以远程开发调试 Golang 的环境，赶紧去写个 `hello world` 体验一下吧！今天的分享就到这，下一篇文章讲解基础语法。

老规矩，感谢各位的阅读，文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习。今天的技术分享就到这里，我们下期再见。

**原创不易，看到这里，如果在我这有一点点收获，就动动手指「转发」和「在看」是对我持续创作的最大支持。**



## Reference

 [设置GOPATH]( https://studygolang.com/articles/17598  )  

[Visual Studio Code变量参考](https://blog.csdn.net/acktomas/article/details/102851702)

[Golang 获取系统环境变量](https://studygolang.com/articles/3387)

[os库获取命令行参数](https://studygolang.com/articles/21438)