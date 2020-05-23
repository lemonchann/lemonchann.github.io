今天和大家分享远程开发工具，分享一下我平常是如何用 VS Code 进行远程开发工作的，以及一步步教你搭建远程开发环境，拥有比德芙还丝滑的远程开发体验。

我们厂里为了最大程度提高工程师生产力，各种研发配套工具非常的齐全，对开发人员每人都有一台云主机，而且是个人主机哦，申请就有的那种，有了云开发主机在家里或者在公司都可以随便折腾，加班也更方便了，好像哪里有点不对。

![img](https://i01piccdn.sogoucdn.com/a02eed86bce1545e)



## 传统的远程开发

大家都知道我是从事后台服务器开发工作的，主力语言是C/C++。我们的服务端程序一般都是跑在 `Linux` 服务器上面，传统的开发流程是在 window 或 Mac 的 IDE 环境编写代码，然后用 `ftp` 或`sync` 同步代码到开发机上编译，程序或服务最终发布到测试或生产环境运行。

就我来说，以前是这么干的：在本地 Windows 和 Linux 云开发机之间开启一个同步程序，本地编辑代码，实时后台同步到 Linux 云开发机，然后用 `xshell` 登录开发机编译、调试，这个过程有点不够优雅，现在有更香的解决方案。



## 更香的远程开发

### 介绍下VS Code

这是一款开源编辑器，却不止是编辑器。

> **Visual Studio Code**（简称**VS Code**）是一个由[微软](https://zh.wikipedia.org/wiki/微软)开发，同时支持[Windows](https://zh.wikipedia.org/wiki/Windows) 、 [Linux](https://zh.wikipedia.org/wiki/Linux)和[macOS](https://zh.wikipedia.org/wiki/MacOS)等操作系统且[开放源代码](https://zh.wikipedia.org/wiki/开放源代码)的[代码编辑器](https://zh.wikipedia.org/wiki/文本编辑器)[[4\]](https://zh.wikipedia.org/wiki/Visual_Studio_Code#cite_note-TechCrunch-4)，它支持[测试](https://zh.wikipedia.org/wiki/调试)，并内置了[Git 版本控制](https://zh.wikipedia.org/wiki/Git)功能，同时也具有开发环境功能，例如代码补全（类似于 [IntelliSense](https://zh.wikipedia.org/w/index.php?title=IntelliSense&action=edit&redlink=1)）、代码片段和[代码重构](https://zh.wikipedia.org/wiki/代码重构)等。该编辑器支持用户个性化配置，例如改变主题颜色、键盘快捷方式等各种属性和参数，同时还在编辑器中内置了扩展程序管理的功能。引用维基百科

我最喜欢的是它的插件能力，几乎想要啥功能都能找到插件支持，应该不用我安利你们都会喜欢的。

在 2019 年的 Stack Overflow 组织的开发者调研中，VS Code被认为是最受开发者欢迎的开发环境，据调查87317名受访者中有 50.7% 的受访者声称正在使用VS Code。

![排名](https://pic3.zhimg.com/v2-3adaf59845ac75ec58b09f8a6c54479d_r.jpg)



说了这么多，反正要表达的就是VS Code很厉害就是了。

**重点来了，今天的主角功能是下面这个远程开发扩展插件。**

微软在 PyCon 2019 大会上发布了VS Code Remote ，从 1.35.0 版本正式提供可以在本地编辑远程开发环境的文件的功能，所以首先确保你的VS Code版本是在这个之上的才能体验到。

VS Code远程开发的工作原理，大致是这样的：

![原理](https://user-gold-cdn.xitu.io/2019/6/7/16b2fdd6d6e51433?imageslim)



下面讲讲如何配置，我的Local OS是 Win10 ,  Remote OS 是 Linux云主机。



### 远程开发配置

#### 配置SSH环境变量

远程开发本地 VS Code 用 SSH 协议与远程服务端通信，所以要先配置SSH环境变量，由于Git自带SSH客户端程序

![SSH程序](SSH%E7%A8%8B%E5%BA%8F.png)

如果你还没装Git的话，这里要先安装 Git，所以配置 Git 的 bin目录到环境变量的 PATH 变量下，这样VS Code连接的时候就能找到它了。

![环境变量](%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.png)

#### 安装远程开发插件

要能连上远程主机，首先我们需要下载VS Code远程开发插件，VS Code其实是提供了一个远程开发插件包，包括：

![远程开发插件](%E8%BF%9C%E7%A8%8B%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6.png)

- [Remote - SSH](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dms-vscode-remote.remote-ssh) - 通过使用 SSH 链接虚拟或者实体Linux主机。
- [Remote - Containers](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dms-vscode-remote.remote-containers) – 连接 Docker 开发容器。
- [Remote - WSL](https://link.zhihu.com/?target=https%3A//marketplace.visualstudio.com/items%3FitemName%3Dms-vscode-remote.remote-wsl) - 连接 Windows Subsystem for Linux （Linux子系统）。

打开软件的扩展界面，搜索 `Remote` 开头的插件，也能看到这三个的不同远程开发插件，**我们这里连接的是云主机，选择安装 Remote - SSH 插件安装即可。**

#### 配置远程连接

1. 首先点侧边栏的「远程资源管理器」之后点击「设置按钮」，进入远程机器配置界面。

![机器配置](%E6%9C%BA%E5%99%A8%E9%85%8D%E7%BD%AE.png)

2. 修改 ssh 配置文件，用于登录远程机器，各项含义在图中有说明。

![SSH配置文件](SSH%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png)

3. 点击连接，登录远程服务器，需要输入几次远程服务器的密码（后面会教你怎么免密登录），输入确认即可。第一次连接会做VS Code Server的初始化工作比较慢，耐心等待。

![登录远程服务](%E7%99%BB%E5%BD%95%E8%BF%9C%E7%A8%8B%E6%9C%8D%E5%8A%A1.png)

4. 登录成功，即可像操作本地环境一样，在VS Code客户端操作远程云主机上的文件。注意，**下图中的「打开文件夹」已经是远端机器上的目录结构了。**

![打开远程目录](%E6%89%93%E5%BC%80%E8%BF%9C%E7%A8%8B%E7%9B%AE%E5%BD%95.png)

4. 可以给远程VS Code 安装插件，安装的插件是在云服务器的VS Code上，对本机的VS Code没有影响，插件在远端提供功能，比如代码审查、自动补齐等等，而这所有的一切就像在本地操作一样，对文件的更改也是直接操作的云主机上的文件，丝滑连接。

![本地插件和远程插件](%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6%E5%92%8C%E8%BF%9C%E7%A8%8B%E6%8F%92%E4%BB%B6.png)

4. 代码编辑与远程终端调试。打开文件编辑的是云服务器的文件，同时可以打开云服务终端，直接在终端操作编译或者查看云服务器信息。

![远程编辑和调试](%E8%BF%9C%E7%A8%8B%E7%BC%96%E8%BE%91%E5%92%8C%E8%B0%83%E8%AF%95.png)

### 配置SSH免密登录  

按照上面的配置步骤，每次连接到远程服务器，都需要输入服务器登录密码很麻烦，可以配置SSH免密登录，免去每次输入密码的烦恼，具体操作步骤如下：

- 打开win cmd终端，输入 ssh-keygen -t rsa 生成秘钥对

![秘钥列表](%E7%A7%98%E9%92%A5%E5%88%97%E8%A1%A8.png)

- 打开生成的秘钥保存路径，拷贝 `id_rsa.pub` 内容，添加到到云服务器的 `~/.ssh/authorized_keys` 文件后面。

- 尝试再次连接，不用输密码了，enjoy.



## 写在最后

这套远程开发环境体验下来，我整体是比较满意的，最大的好处是不用给电脑装太多软件，选择VS Code是因为需要经常在C++/Python/Go三种IDE之间切换比较麻烦，现在即使是电脑配置低点都没关系，因为所有的编辑器插件扩展和代码都在云端，通过 `SSH` 连接操作一个VS Code打遍所有。

而且由于远程开发插件的存在，不论我在哪里，只要有电脑都能方便的打开云端开发环境，非常的方便，这么好用的工具大幅提升生产力，所以今天来分享给大家。

老规矩。感谢各位的阅读，文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习。

今天的技术分享就到这里，我们下期再见。

对了，今天是母亲节，别忘了给家里打个电话。

![泰迪, 母亲节, 爱, 妈妈, 贺卡, 母亲, 欢迎](https://i0.hippopx.com/photos/282/1011/765/teddy-mother-s-day-love-mama-preview.jpg)

**原创不易，不想被白票，如果在我这有收获，就动动手指「在看」「转发」是对我持续创作的最大支持。**







