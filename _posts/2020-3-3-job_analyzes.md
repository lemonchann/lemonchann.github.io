---
layout: post
title: "我分析几个一线城市的近千份岗位招聘需求，得出应该这么准备找工作"
date:   2020-1-27
tags: [后台开发]
comments: true
author: lemonchann
---

每年的三四月份是招聘高峰，也常被大家称为金三银四黄金求职期，这时候上一年的总结做完了，奖金拿到了，职场人开始谋划着年初的找工作大戏。

作为IT人要发挥自己的专业特长，如何让伯乐和千里马更快相遇？我利用大数据分析了北京、广州、深圳三个一线城市的C++招聘岗位信息，篇幅限制文中只拿出北京和深圳的数据展示，让我们来看看岗位的招聘现状，以及如何科学提高应聘成功率。

文末可以获取本次分析的高清图表，需要的同学自取。同时分享完整源码用于学习交流，若对其他岗位感兴趣也可以自行运行源码分析。

### 需求分析

通过大数据分析招聘网站发布的招聘数据，得出岗位分布区域、薪资水平、岗位关键技能需求、匹配的人才具有哪些特点、学历要求。从而帮助应聘者提高自身能力，补齐短板，有的放矢的应对校招社招，达成终极目标获得心仪的offer。

### 软件设计

数据分析是Python的强项，项目用Python实现。软件分为两大模块：数据获取 和 数据分析

![](https://upload-images.jianshu.io/upload_images/7842464-b9d276d4329a7762.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 详细实现

#### 数据获取

request库构造请求获取数据

```py
cookie = s.cookies
req = requests.post(self.baseurl, headers=self.header, data={'first': True, 'pn': i, 'kd':self.keyword}, params={'px': 'default', 'city': self.city, 'needAddtionalResult': 'false'},   cookies=cookie, timeout=3)
text = req.json()
```

数据csv格式存储

```py
with open(os.path.join(self.path, '招聘_关键词_{}_城市_{}.csv'.format(self.keyword, self.city)), 			   'w',newline='', encoding='utf-8-sig') as f:
    f_csv = csv.DictWriter(f, self.csv_header)
    f_csv.writeheader()
    f_csv.writerows(data_list)
```

#### 数据分析

字段预处理

```py
df_all.rename({'职位名称': 'position'}, axis=1, inplace=True) #axis=1代表index; axis=0代表column
df_all.rename({'详细链接': 'url'}, axis=1, inplace=True)
df_all.rename({'工作地点': 'region'}, axis=1, inplace=True)
df_all.rename({'薪资': 'salary'}, axis=1, inplace=True)
df_all.rename({'公司名称': 'company'}, axis=1, inplace=True)
df_all.rename({'经验要求': 'experience'}, axis=1, inplace=True)
df_all.rename({'学历': 'edu'}, axis=1, inplace=True)
df_all.rename({'福利': 'welfare'}, axis=1, inplace=True)
df_all.rename({'职位信息': 'detail'}, axis=1, inplace=True)
df_all.drop_duplicates(inplace=True)
df_all.index = range(df_all.shape[0]) 
```

数据图表展示

```py
from pyecharts.charts import Bar
regBar = Bar(init_opts=opts.InitOpts(width='1350px', height='750px'))
regBar.add_xaxis(region.index.tolist())
regBar.add_yaxis("区域", region.values.tolist())
regBar.set_global_opts(title_opts=opts.TitleOpts(title="工作区域分布"),
                     toolbox_opts=opts.ToolboxOpts(),
                     visualmap_opts=opts.VisualMapOpts())
                     
from pyecharts.commons.utils import JsCode
shBar = Bar(init_opts=opts.InitOpts(width='1350px', height='750px'))
shBar.add_xaxis(sala_high.index.tolist())
shBar.add_yaxis("区域", sala_high.values.tolist())
shBar.set_series_opts(itemstyle_opts={
            "normal": {
                "color": JsCode("""new echarts.graphic.LinearGradient(0, 0, 0, 1,             [{
                    offset: 0,
                    color: 'rgba(0, 244, 255, 1)'
                }, {
                    offset: 1,
                    color: 'rgba(0, 77, 167, 1)'
                }], false)"""),
                "barBorderRadius": [30, 30, 30, 30],
                "shadowColor": 'rgb(0, 160, 221)',
            }})
shBar.set_global_opts(title_opts=opts.TitleOpts(title="最高薪资范围分布"), toolbox_opts=opts.ToolboxOpts())

word.add("", [*zip(key_words.words, key_words.num)],
         word_size_range=[20, 200], shape='diamond')
word.set_global_opts(title_opts=opts.TitleOpts(title="岗位技能关键词云图"),
                     toolbox_opts=opts.ToolboxOpts())
```



### 数据分析

#### 区域分布

C++岗位区域分布，北京 VS 深圳
![区域对比北京-深圳](https://upload-images.jianshu.io/upload_images/7842464-16da08548475ef0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

北京的C++岗位数量比深圳更多，首都buff加持，并且集中分布在海淀区和朝阳区这两个区域，中关村位于海淀区，还有位于海淀区西北旺镇的后厂村，腾讯、滴滴、百度、新浪、网易这些互联网巨头扎堆，自然能提供更多的岗位。

深圳的岗位则集中在南山区，猜测鹅厂C++大厂在南山区贡献了重大份额，第二竟然在宝安区。

#### 学历分布

C++岗位学历分布，北京 VS 深圳
![学历对比-北京-深圳](https://upload-images.jianshu.io/upload_images/7842464-d72d4abe4d8f3f37.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

学历上两个城市的本科学历占比都是85%以上，北京岗位需求研究生占比和大专相当。可见大部分岗位本科学历即可胜任，或许能给即将毕业纠结考不考研的你一些参考。

如果你的学历是专科，那么需要加倍的努力，因为留给你的职位并不是很多。同时，从图表数据来看，深圳的岗位对大专生需求10%而对硕士仅占2%，或许专科生去深圳比去北京更加友好，emmm...仅供参考。

#### 薪资分布

C++岗位薪资分布，薪资单位K。

北京最高薪资 VS 最低薪资
![](https://upload-images.jianshu.io/upload_images/7842464-5021c0134674ce9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

深圳最高薪资 VS 最低薪资
![](https://upload-images.jianshu.io/upload_images/7842464-f9432cc08fda0d2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

薪资对比没啥好说的，大家看图说话，只想说帝都果然财大气粗。

#### 技能储备

C++岗位关键技能词云，北京 VS 深圳
![](https://upload-images.jianshu.io/upload_images/7842464-2a5da16d61f7222a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


首先在脱离开发走上管理岗位之前，编程解决问题能力是最重要，可以看到「编程」能力在技能词云中占比最大。

大部分岗位要求较高的「算法、数据结构、Linux、数据库(存储)、多线程(操作系统)」这些计算机基础素养，所以不管你是在校学生准备校招或者职场老人准备跳槽，都需要储备好这些计算机基础能力，无论哪种个方向，硬实力的储备都很重要。

值得一提的是除去硬核技术要求外，岗位对候选人的软实力也有要求，比如更加偏爱具备「团队、协作、学习、沟通」这些能力的候选人，大家在提高技术能力的同时，也要注重这些软实力的培养。

一个彩蛋。Linux和window下都有C++开发岗位需求，相对而言Linux下C++开发占比更多，词云更大，如果你对这两个平台没有特殊偏爱，那么学Linux下开发大概能加大应聘成功率，毕竟岗位需求更大。

关注公众号「柠檬的编程学堂」回复 「分析」获取本文程序完整源码以及高清分析图表。

![](https://upload-images.jianshu.io/upload_images/7842464-76c150cb84224878.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)









 