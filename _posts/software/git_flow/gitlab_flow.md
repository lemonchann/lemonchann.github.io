标题：别再把git当svn用了！大厂程序员都是这样用git做版本管理的

## 版本控制

### 集中式

大家日常开发应该都有接触过版本控制，说起版本控制软件首先会想到老大哥`svn` ，很多公司的老项目都会用svn来管理，因为它是集中式的版本控制软件，部署简单，使用方便时svn的最大特点。我上家公司用的版本控制软件就是 `svn` ，包括鹅厂早起的项目也是基于 `svn` 做版本控制的，不过现在项目都是使用更加强大的 `git` 来做版本控制。

### 分布式

那么为什么需要版本控制呢？



## Git是什么



## 三种主流工作流

### Git flow

### Github flow

### Gitlab flow



## 实际操作

通用操作： git br -a 查看分支

开发分支操作：

// 1. 初始创建开发分支

git checkout -b dev/appeal_optimize_2 //创建并切换分支

git push -u origin dev/appeal_optimize_2 // 推送创建的分支到远端 (可选)

 

步骤2 可选

// 2.其他小伙伴下载代码后切换到开发分支

git clone

git checkout -b dev/appeal_optimize_2 origin/dev/appeal_optimize_2 // 创建本地开发分支并关联到远端分支

 

//3. 创建者已经在dev分支，正常开发提交,推送到dev分支

git add file

git ci file -m 'msg'

git pull //拉取dev分支其他人的最新提交

git push // 推送到dev分支（可选）

 

// 4. 切换到master分支后把dev分支合并进来 

git checkout master

git merge dev/appeal_optimize_2 

 

//5. 开发完成，删除dev分支（必选），包括本地和远程dev分支

git branch -d dev/appeal_optimize_2 // 删除本地分支

git push origin -d dev/appeal_optimize_2 或者 git push origin :dev/appeal_optimize_2 // 删除远程分支（可选）

 

出release版本流程操作 (非多人协作收集版本暂时可以不用这一步)

出release分支，操作类似，最后清除release分支

 

// 出完版本在master打tag做记录

git tag -a v2.0.0 -m "appeal optimize v2 region check and observe" master //本地

git push --tags 或者 git push origin v2.0.0 //远程

 

//版本出问题从master的tag处拉bugfix分支，不影响其他开发分支

git checkout -b bugfix/appeal_optimize_2 v2.0.0

修改完合入master分支，最后清除bugfix分支

## Reference

 https://segmentfault.com/a/1190000016865867 

https://iwiki.oa.tencent.com/pages/viewpage.action?pageId=103528756 主要参考 GitLab flow

http://km.oa.com/articles/show/349413?kmref=search&from_page=1&no=2 参考命令行 但是 他是Gitflow

http://km.oa.com/articles/show/429718?ts=1571801581 参考分支命名 但是他是Gitflow