---
layout: post
title: "从0开始利用github pages搭建个人博客"
date:   2019-11-22
tags: [geek]
comments: true
author: lemonchann
---

用github pages 来写博客非常简单，搭建也是十分容易。follow me.

## 建立博客Git仓库

首先你要在[github](https://github.com/)上有自己博客仓库，用来生成和存放博客文章。你可以直接fork我的博客仓库。这样你马上有了自己的博客仓库。

[点这里我的博客地址](https://github.com/lemonchann/lemonchann.github.io)

![for博客](https://raw.githubusercontent.com/lemonchann/lemonchann.github.io/master/2019-11-22-create_blog_with_github_pages/fork%E5%8D%9A%E5%AE%A2.png)

## 搜索功能集成

[Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)

<!-- more -->

### 配置search.json

[复制这份代码到你博客的根目录](https://github.com/christian-fei/Simple-Jekyll-Search/blob/master/example/search.json)

这个配置文件代表可以搜索博客的标题、标签、时间、分类。

### 配置index.html

```html
<div class="search-container">
  <input type="text" id="search-input" placeholder="search blog posts...">
  <ul id="results-container"></ul>
</div>

<!--script src="https://unpkg.com/simple-jekyll-search/dest/simple-jekyll-search.min.js"></script-->
<script src="{{ site.baseurl }}/js/simple-jekyll-search.min.js"></script>

<script>
	window.simpleJekyllSearch = new SimpleJekyllSearch({
	searchInput: document.getElementById('search-input'),
	resultsContainer: document.getElementById('results-container'),
	json: '{{ site.baseurl }}/search.json',
	searchResultTemplate: '<li><a href="{url}?query={query}" title="{desc}">{title}</a></li>',
	noResultsText: 'No results found',
	limit: 10,
	fuzzy: false,
	exclude: ['Welcome']
  })
</script>
```

## 搜索框样式

[html插入样式方法](https://blog.csdn.net/u014103733/article/details/72961366)

参考：[jekyll search搭建](https://cloud.tencent.com/developer/article/1119290)



## 社交链接

以增加zhihu链接为例

[svg icon仓库](https://github.com/FortAwesome/Font-Awesome/blob/516a62816c76255dc92ed55b906e9dca5a21b28b/svgs/brands/zhihu.svg)

[viewBox](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)

> viewBox属性的值是一个包含4个参数的列表 `min-x`, `min-y`, `width` and `height`， 以空格或者逗号分隔开， 在用户空间中指定一个矩形区域映射到给定的元素,查看属性 

[深入简出 SVG 教程](https://zhuanlan.zhihu.com/p/36138381)

修改root目录下index.html

### 配置_config.yml

```yml
footer-links:
  weibo: yourname #请输入你的微博个性域名 https://www.weibo.com/<yourname>
  zhihu: yourname #输入你知乎主页链接上的名字 https://https://www.zhihu.com/people/<yourname>
```

### 修改svg-icons.html

文件路径在_include/svg-icons.html下，增加zhihu链接

```html
{% if site.footer-links.zhihu %}
  <li><a href="https://zhihu.com/people/{{ site.footer-links.zhihu }}" class="icon-2 zhihu" title="ZhiHu"><svg viewBox="0 0 600 600"><path d="M170.54 148.13v217.54l23.43.01 7.71 26.37 42.01-26.37h49.53V148.13H170.54zm97.75 193.93h-27.94l-27.9 17.51-5.08-17.47-11.9-.04V171.75h72.82v170.31zm-118.46-94.39H97.5c1.74-27.1 2.2-51.59 2.2-73.46h51.16s1.97-22.56-8.58-22.31h-88.5c3.49-13.12 7.87-26.66 13.12-40.67 0 0-24.07 0-32.27 21.57-3.39 8.9-13.21 43.14-30.7 78.12 5.89-.64 25.37-1.18 36.84-22.21 2.11-5.89 2.51-6.66 5.14-14.53h28.87c0 10.5-1.2 66.88-1.68 73.44H20.83c-11.74 0-15.56 23.62-15.56 23.62h65.58C66.45 321.1 42.83 363.12 0 396.34c20.49 5.85 40.91-.93 51-9.9 0 0 22.98-20.9 35.59-69.25l53.96 64.94s7.91-26.89-1.24-39.99c-7.58-8.92-28.06-33.06-36.79-41.81L87.9 311.95c4.36-13.98 6.99-27.55 7.87-40.67h61.65s-.09-23.62-7.59-23.62v.01zm412.02-1.6c20.83-25.64 44.98-58.57 44.98-58.57s-18.65-14.8-27.38-4.06c-6 8.15-36.83 48.2-36.83 48.2l19.23 14.43zm-150.09-59.09c-9.01-8.25-25.91 2.13-25.91 2.13s39.52 55.04 41.12 57.45l19.46-13.73s-25.67-37.61-34.66-45.86h-.01zM640 258.35c-19.78 0-130.91.93-131.06.93v-101c4.81 0 12.42-.4 22.85-1.2 40.88-2.41 70.13-4 87.77-4.81 0 0 12.22-27.19-.59-33.44-3.07-1.18-23.17 4.58-23.17 4.58s-165.22 16.49-232.36 18.05c1.6 8.82 7.62 17.08 15.78 19.55 13.31 3.48 22.69 1.7 49.15.89 24.83-1.6 43.68-2.43 56.51-2.43v99.81H351.41s2.82 22.31 25.51 22.85h107.94v70.92c0 13.97-11.19 21.99-24.48 21.12-14.08.11-26.08-1.15-41.69-1.81 1.99 3.97 6.33 14.39 19.31 21.84 9.88 4.81 16.17 6.57 26.02 6.57 29.56 0 45.67-17.28 44.89-45.31v-73.32h122.36c9.68 0 8.7-23.78 8.7-23.78l.03-.01z"/></svg><!--[if lt IE 9]><em>YouTube</em><![endif]--></a></li>
  {% endif %}
```



## 添加网站计数

[html颜色表](http://xh.5156edu.com/page/z1015m9220j18754.html)

[html style属性](https://www.geeksforgeeks.org/html-style-attribute/)

eg.  `style="font-family:arial;color:Gainsboro;font-size:10px; text-align:right;width:200px;background-color:gray;`

### 不算子

统计原理，[官方指引](http://ibruce.info/2015/04/04/busuanzi/#more)

### 修改根目录下index.html

增加如下内容：

```html
<!--不算子网站访客统计-->
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js">
</script>
<!-- pv的方式，单个用户连续点击n篇文章，记录n次访问量 -->
<div align="center">
	<span id="busuanzi_container_site_pv" style="font-family:Consolas;color:Silver;font-size:12px;">
		View:<span id="busuanzi_value_site_pv" style="font-family:Consolas;color:Silver;font-size:12px;"></span>
	</span>
	<!-- uv的方式，单个用户连续点击n篇文章，只记录1次访客数 -->
	<span id="busuanzi_container_site_uv" style="font-family:Consolas;color:Silver;font-size:12px;">
		User:<span id="busuanzi_value_site_uv" style="font-family:Consolas;color:Silver;font-size:12px;"></span>
	</span>
</div>
```



## Google站长分析

[GoogleAnalytics](https://analytics.google.com/analytics/web/#/report-home/a152888548w216036791p206483624)

[Google Search Console]

## 如何传图片

[PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/)



## 其他功能

[小功能](https://blog.csdn.net/ds19991999/article/details/81293467)

[好用的github插件](https://blog.csdn.net/u012702547/article/details/100533763)



## 网站结构

根目录的index.html生成blog首页

_include/footer.html生成侧边栏

_include/svg-icons.html生成社交头像的链接

## 问题汇总

[jekyll端口被占用EACCES](https://www.iteye.com/blog/ywsm-510670)