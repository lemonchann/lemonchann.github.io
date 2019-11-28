---
layout: post
title: "新版本gitbook配置图书预览和生成"
date:   2019-11-18
tags: [tool]
comments: true
author: lemonchann

---

什么是Gitbook? 简单说就是可以把用md写的多个文档组织成**书**发布，md你可以放在github管理，配置gitbook关联github可以实现实时commit的预览生成。也可本地预览，甚至生成各种格式文档输出的强大工具。

<!-- more -->

## 安装Gitbook
* 安装nodejs可以去[官网](http://nodejs.cn/download/)下载对应版本  
*  安装gitbook，打开win cmd输入npm install gitbook-cli -g   
> 常用命令：  
> **gitbook -V 查看版本**    
> **gitbook serve 生成网页localhost:4000预览** - 命令输入要进到SUMMARY.md所在目录![gitbook_serve](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/gitbook_serve.png)    
> gitbook init //初始化目录文件   
> gitbook help //列出gitbook所有的命令   
> gitbook --help //输出gitbook-cli的帮助信息   
> gitbook build //生成静态网页   
> gitbook serve //生成静态网页并运行服务器  
> gitbook build --gitbook=2.0.1 //生成时指定gitbook的版本, 本地没有会先下载  
> gitbook ls //列出本地所有的gitbook版本  
> gitbook ls-remote //列出远程可用的gitbook版本  
> gitbook fetch 标签/版本号 //安装对应的gitbook版本  
> gitbook update //更新到gitbook的最新版本  
> gitbook uninstall 2.0.1 //卸载对应的gitbook版本  
> gitbook build --log=debug //指定log的级别  
> gitbook builid --debug //输出错误信息  

## 用Gitbook转换markdown文件生成PDF

### 安装calibre 
* 电子书生成下载依赖calibre否则会报错，建议先安装，[下载地址](https://calibre-ebook.com/download)
* 配置calibre环境变量，我的目录是C:\Program Files\Calibre2

  ![环境变量设置1](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE1.PNG)

  ![环境变量设置2](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE2.PNG)

### 生成PDF

打开win cmd命令行，到SUMMARY.md所在目录执行 **gitbook pdf 生成pdf**    
> 转换PDF失败原因：
1. 没有安装calibre
2. 安装calibre之后需要设置环境变量C:\Program Files\Calibre2   
3. [报错1](http://xcoding.tech/2018/08/08/hexo/%E5%A6%82%E4%BD%95%E4%BB%8E%E6%A0%B9%E6%9C%AC%E8%A7%A3%E5%86%B3hexo%E4%B8%8D%E5%85%BC%E5%AE%B9%7B%7B%7D%7D%E6%A0%87%E7%AD%BE%E9%97%AE%E9%A2%98/)

## Gitbook关联github

**Gitbook上同步github的配置界面已经发生了变化，新界面操作如下:**

![gitbook空间](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/gitbook%E7%A9%BA%E9%97%B4.png)

![关联github](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/%E5%85%B3%E8%81%94github.png)

### 发布到github pages
#### 关于 GitHub Pages
>GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，（可选）通过构建过程运行文件，然后发布网站。 您可以在 GitHub Pages 示例集合中查看 GitHub Pages 站点的示例。

您可以在 GitHub 的 github.io 域或自己的自定义域上托管站点。 更多信息请参阅“对 GitHub Pages 使用自定义域”。

要开始使用，请参阅“创建 GitHub Pages 站点”。

#### GitHub Pages 站点的类型
有三种类型的 GitHub Pages 站点：项目、用户和组织。 项目站点连接到 GitHub 上托管的特定项目，例如 JavaScript 库或配方集合。 用户和组织站点连接到特定的 GitHub 帐户。

用户和组织站点始终从名为 <user>.github.io 或 <organization>.github.io 的仓库发布。 除非您使用自定义域，否则用户和组织站点位于 http(s)://<username>.github.io 或 http(s)://<organization>.github.io。

项目站点的源文件与其项目存储在同一个仓库中。 除非您使用自定义域，否则项目站点位于 http(s)://<user>.github.io/<repository> 或 http(s)://<organization>.github.io/<repository>。
[更多](https://help.github.com/cn/github/working-with-github-pages/about-github-pages)

#### [这里](http://www.chengweiyang.cn/gitbook/github-pages/README.html)也包含推送到**github.page**的方法
- master, 保存书籍的源码
- gh-pages, 保存书籍编译后的 HTML 文件   

**步骤：**

- `gitbook build` 将书籍内容输出到默认目录，也就是当前目录下的 _book 目录

  ![gitbook_pdf](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-11-18-new_gitbook_tutors/gitbook_pdf.png)

- 创建gh-pages分支，并且删除不需要的文件,仅保留git目录和 _book目录
> $ git checkout --orphan gh-pages   
$ git rm --cached -r .  
$ git clean -df  
$ rm -rf *~`
- 然后，加入 _book 下的内容到分支中：
> $ cp -r _book/* .  
$ git add .  
$ git commit -m "Publish book"  
- 将编译好的书籍内容上传到 GitHub 项目的 远程gh-pages 分支了
> $git push -u origin gh-pages


### 参考
[详细教程](https://jackchan1999.github.io/2017/05/01/gitbook/GitBook%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B/)   
[官方指引-integrations-Github](https://docs.gitbook.com/integrations/github)   
[Github的GitBook项目](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md)  
[github pages中文帮助](https://help.github.com/cn/github/working-with-github-pages/about-github-pages)