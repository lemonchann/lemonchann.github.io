## yum软件源安装

用yum install git 在centos 默认安装的git版本是 1.8.3.1 太低了

```
yum install git
```



```
# git --version
git version 1.8.3.1
```



## 源码包安装

步骤1. 安装依赖包

```
# yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
# yum install  gcc perl-ExtUtils-MakeMaker
```

上面的软件不一定全部安装，可以用下面的命令检查，已经安装的就不用安装了。

```
yum list installed |grep xxx  
```



步骤2. 卸载旧的git版本（如果之前有安装rpm包）

```
# yum remove git
```

步骤3. 下载&解压

> 源码文件（当前最新版本 **v2.16.1** @ **2018年2月9日**）
>
> \- 地址1：https://www.kernel.org/pub/software/scm/git/
> \- 地址2：[https://github.com/git/git/release](https://github.com/git/git/releases)

```
# cd /usr/src
# wget https://www.kernel.org/pub/software/scm/git/git-2.5.0.tar.gz
# tar -zxvf git-2.5.0.tar.gz
```

步骤4. 编译安装

```
# cd git-2.5.0
# make prefix=/usr/local/git all
# make prefix=/usr/local/git install
# echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/bashrc
# source /etc/bashrc
```

步骤5. 检查git版本

```
# git --version
git version 2.5.0
```

 

**注意：如果安装完查看版本不是我们安装的最新版，请重新执行下面的操作**

```
# yum remove -y git
# source /etc/bashrc
# git --version
```

 

参考：

- https://github.com/git/git/blob/master/INSTALL
- http://stackoverflow.com/questions/21820715/how-to-install-latest-version-of-git-on-centos-6-x-7-x