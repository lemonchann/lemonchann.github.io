# IDEA Plugin 开发手册 🔥

>你好，我是小傅哥，[《重学Java设计模式》](https://item.jd.com/13218336.html) 图书作者，一线互联网 Java 工程师、架构师。

一个着迷于技术又喜欢不断折腾的技术活跃者，从13年毕业到进入互联网，开发过交易、营销类项目，实现过运营、活动类项目，设计过中间件，组织过系统重构，编写过技术专利。不仅从事业务系统的开发工作，也经常做一些字节码插桩类的设计和实现，对架构的设计和落地有丰富的经验。在热衷于Java语言的同时，也喜欢研究中继器、I/O板卡、C#和PHP！

---

## 一、介绍

`💥为什么？写写快乐的热门文章不好吗！`

从开始准备成体系的编写 `IDEA Plugin` 知识内容前，我就知道这大概率不会是一个有太多阅读量的文章，因为基本日常的工作开发中几乎也用不到这样的知识。

那么为什么还要编写呢？就是因为用的人不多，所以这方面的知识成体系的少，也就导致真的有需要的人根本找不到一个可以上手的资料。*怎么开发*、*什么模式*、*哪种技术*、*如何发布* 等等，这些内容几乎就是空白的，在你有此类需求的时候完全不知道如何上手。

所以🌶，又一套**成系列体系**的`《IDEA Plugin 开发手册》`内容已经为有需要的你准备好啦：

![](https://bugstack.cn/images/article/knowledge/knowledge-220123-01.png)

- 此开发手册，分为4章12节循序渐进的通过实践案例开发的方式，串联 IDEA Plugin 开发的各项常用技术点，为读者讲解如何开发一个 IDEA 插件。
- 基本开发类知识点包括：`gradle 工程创建`、`插件发布`、`Swing UI`、`各类窗体`、`菜单配置`、`工程上下文对象`、`向导步骤`、`内容存放`、`配置加载`等，通过这些知识在案例中的逐个使用，而学习如何开发插件。

💋`鉴于作者水平有限`，如果PDF中含有不易理解的内容，一定是作者在编写的过程中缺少必要的描述和严格的校准，感谢把你的意见或者疑问提交给我来完善，也欢迎与我多一些交互，互相进步共同成长。

## 二、能干啥，举个栗子🌰

`vo2dto，一个已经被下载1000+的插件`

![](https://bugstack.cn/images/article/knowledge/knowledge-220123-02.png)

这是小傅哥开发的一款用于帮助使用 IDEA 编写代码的研发人员，快速生成两个对象转换过程中所需要大量的 `x.set(y.get)` 代码块的 vo2dto 插件工具。*可以直接在 IDEA 中搜索安装使用*

| `对vo2dto感兴趣的，程序员👨🏻‍💻‍，来自这些国家` |
|:---:|
| ![](https://bugstack.cn/images/article/knowledge/knowledge-220123-03.png) |

- 插件：[https://plugins.jetbrains.com/plugin/18262-vo2dto](https://plugins.jetbrains.com/plugin/18262-vo2dto)
- 源码：[https://github.com/fuzhengwei/vo2dto](https://github.com/fuzhengwei/vo2dto)
- 视频：[https://www.bilibili.com/video/BV13Y411h7fv](https://www.bilibili.com/video/BV13Y411h7fv) - `讲解插件的整体设计和使用说明`

## 三、别说了，上干货吧！

**Hello, world of idea plugin ！**  你好，IDEA 插件的世界！欢迎来到这里！

IDEA 插件开发可以帮助研发人员提升能效，解决一些实际场景中的共性问题。但最近在折腾IDEA插件开发的时候，市面的资料确实不多，也没有成体系完整的开发指导手册，所以就遇到了很多不知道就不会的事情，需要一点点查询搜索源码、验证API接口，最终把各项功能实现，当然在这个过程中也确实踩了不少坑！接下来在这个专栏会把一些关于 IDEA 插件开发用到的各项知识做成案例输出出来，帮助有需要的研发伙伴，一起建设 IDEA Plugin。

### 1. 适合人群

1. 具备一定编程基础，工作1-3年的研发人员
2. 有 IDEA Plugin 开发需求的研发人员
3. 希望可以拓展一些除了业务以外的开发技能
4. 想做一些开源软件的贡献人员

### 2. 我能学到什么

1. 看得懂，有很多的案例来串联 IDEA Plugin 插件开发技能
2. 学得会，通过案例实践的方式学习 IDEA Plugin 开发技巧
3. 搞得清，不只是实践，还是实际场景的结合
4. 弄得明，学习完这套插件开发技巧，就可以自己完成一些场景设计和开发了

### 3. 阅读建议

此专栏是以案例串联 IDEA Plugin 插件开发中常用的技巧，在学习的过程中可以先着重案例实践，在去考虑如何设计和开发，以及已经上手后再去阅读一些核心的API以及如PMD插件的开发，学习各项技术补充自己的知识。

粉丝伙伴在阅读的过程中，**千万不要害怕在学习的过程中遇到问题，这些都是正常的！** 希望你可以一直坚持把这些内容事必躬亲、亲历亲为的学完，加油！

## 四、问题交流

![](https://github.com/fuzhengwei/small-spring/blob/main/docs/assets/img/bugstack-md.png?raw=true)

<br/>
<div align="center">
    <a href="https://github.com/fuzhengwei/CodeGuide">关注小傅哥，你可以学到的更多！</a>
</div>
<br/>  

- **加群交流**

    本群的宗旨是给大家提供一个良好的技术学习交流平台，所以杜绝一切广告！由于微信群人满 100 之后无法加入，请扫描下方二维码先添加作者 “小傅哥” 微信(fustack)，备注：`学习加群`。
    
    <img src="https://bugstack.cn/images/personal/fustack.png" width="180" height="180"/>

- **公众号(bugstack虫洞栈)**

    沉淀、分享、成长，专注于原创专题案例，以最易学习编程的方式分享知识，让自己和他人都能有所收获。目前已完成的专题有；Netty4.x实战专题案例、用Java实现JVM、基于JavaAgent的全链路监控、手写RPC框架、DDD专题案例、源码分析等。
    
    <img src="https://bugstack.cn/images/personal/qrcode.png" width="180" height="180"/>

