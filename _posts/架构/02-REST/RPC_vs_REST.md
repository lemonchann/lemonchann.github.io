本文是后端微服务架构系列的第二篇文章。在微服务架构中服务之间的通信方式常见的有两种：`RPC`  和 ` REST`，关于微服务和 `RPC`  的更多细节，可以参考我上一篇文章[]()

这篇文章主要介绍什么是 `REST` 风格设计以及 `RESTful` 接口。阅读完本文你将收获以下知识点：

- 什么是 `REST` 和 `RESTful` 
- `REST` 接口设计规范是什么
- `REST` 为什么要设计成无状态
- 接口无状态真的是没有状态吗
- `RPC` 和 `REST` 适用场景



### REST和RESTful

`REST（Representational State Transfer，表述性状态转移）` 是一种软件架构风格。REST提出了一组架构约束条件和原则，任何满足 `REST` 约束条件和原则的架构，都称为 `RESTful` 架构。

微服务之间需要相互通信以完成特定的业务处理，在典型的客户端-服务端设计模型中，客户端和服务端通通过消息请求-响应的方式交互协作，`REST` 就是这样一套微服务之间交互接口的设计约束和原则规范。

乍一看 `REST`「表述性状态转移」每个字都认得，连起来不知道什么意思。也难怪，这是作者 `Roy Thomas Fielding` 在他的博士论文里提出的概念，论文自然都是学术用语，不过感兴趣的同学可以去看看作者论文原文，地址我贴出来：https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

今天 lemon 用大白话帮你透彻理解这个概念，我们把「表述性状态转移」掰开来看，先搞明白什么是「表述性」，什么是「状态转移」。

### 表述性

「表述性」其实是缺少了主语的，主语是「资源」。完整的描述是「资源表述性」，也就是「资源的描述」。在网络通信中用什么描述资源呢？没错就是 `URI（Uniform Resource Identifier，统一资源标识符）`。

这里有几个近义词先给大家先科普一下：

`URI`  是统一资源标识符，用来唯一的标识一个资源。 

`URL` 是统一资源定位器，它是一种具体的 `URI`，即 `URL` 可以用来标识一个资源，而且还指明了如何定位这个资源，`URL` 是 `URI` 的子集。

`URN`  统一资源命名，是通过名字来标识资源。`URN `也是 `URI` 的子集。
![URI-URN-URL](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LThhM2MzMWM2N2Q0ZDVjM2IucG5n?x-oss-process=image/format,png)


在 `HTTP` 协议中用 `URL` 标识资源，也就是浏览器地址栏你看到的那一串网址。

![地址栏URL](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LWE2ZDU4NWE2OTNhNTE4MTEucG5n?x-oss-process=image/format,png)


#### 资源表述性

为了说明「资源描述性」接口设计的优点，我们来做一个接口设计方法的对比，举个栗子就清楚了。

##### 传统的接口设计

先来看下传统的网络通信模式是怎么样的。假设`lemon`这个人物对象，在服务端的存储形式是一个`c++`的`class`类型存储。

下面的过程展示，客户端发送请求服务端创建一个 `lemon` 对象的过程。

1. 服务端定义存储结构头文件 `lemon.h`

```c++
class lemon{
  string name;
  string address;
  uint64 phone;
}
```

2. 客户端代码引用服务端定义的`lemon.h`，**互相引用头文件，增加了服务耦合性！**

3. 客户端初始化一个 `lemon` 实例并序列化后通过网络接口发送给服务端。

```C++
class lemon lm;
lm.name = "lemon";
lm.address = "Shenzhen";
lm.phone = 18666666666;
```

4. 服务端接收消息，反序列化，存储传输过来的 `lemon` 对象



##### 资源表述性接口设计

`lemon` 这个服务内部的对象，对外表现可以用一张图片来表示，也可以用包含`lemon` 的姓名、地址、电话等信息的 `xml` 或 `json` 格式的数据表示。

```json
{
name : "lemon",
address:  "ShenZhen",
phone  :  18666666666
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
	<name>lemon</name>
	<address>ShenZhen</address>
	<phone>18666666666</phone>
```

也就是说，`lemon` 这个「资源」在服务内部的存放形式对外不可见，外界客户端发起请求可以用不同的资源表述格式来获取服务端的资源。

（如果服务器会说话，他内心`os` 大概是这样的:  客户端你不用管我是如何保存这个对象的，只要你说的清楚想要什么对象，只管发来请求便是！）。

<img src="http://wx2.sinaimg.cn/large/005LQqKVgy1felzzeyzyzj30k00k0wfi.jpg" height="200" width="200" />

![](https://imgconvert.csdnimg.cn/aHR0cDovL3d4Mi5zaW5haW1nLmNuL2xhcmdlLzAwNUxRcUtWZ3kxZmVsenpleXp5emozMGswMGswd2ZpLmpwZw?x-oss-process=image/format,png)


这样做最显然的好处是，减少了服务之间的耦合。客户端访问服务资源之前不需要知道资源在服务端的具体存储格式，只需描述资源形式即可修改、创建、更新、删除服务端的资源。



### 状态转移

搞懂了「资源描述性」接下来看下什么是「状态转移」？状态转移就是客户端通过一系列请求动作，推动服务端的资源状态发生变化，资源的状态可以在「创建-修改-查看-删除」之间转移。

![资源状态转移](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LWI5ZGIzMWFhNTY4ZWFjNGIucG5n?x-oss-process=image/format,png)


资源状态的变化在宏观上的反应就是业务流程推进。打个比方，你去银行系统开户、查余额、销户，这个过程你推动了你的银行账户这个「资源」经历了不同的状态转移让你完成了不同的业务操作。



### REST的约束条件

#### 协议选择

`REST` 本身并没有提到底层应该使用什么协议，日常实践案例中最常用的是基于 `HTTP` 的 `RESTful` 实现。

这是因为 `HTTP` 协议自带的动词 `GET/POST/PUT/DELETE` 可以作为推动状态转移的方法，另外`HTTP` 的制定了规范的状态码。还有其他的一些 `HTTP` 特性，这些特性使得在`HTTP` 之上实现 `REST` 要简单得多，而如果使用其他协议的话，就需要自己实现这些特性。



#### 请求规范

` RESTful` 架构中，发生状态转换的是「资源」，所以`URI` 中一般只能包含代表「资源」的名词，并且推荐是复数，而不应该在 `URI` 中包对资源进行操作的动词。

对资源执行的`CURD「增删改查」`动作应该在`HTTP`请求方法的`GET/POST/PUT/DELETE`中体现。

符合REST规范的写法：

```http
POST http://www.test.com/lemon   // 创建
Get http://www.test.com/lemon    // 查询
PUT http://www.test.com/lemon    // 修改
DELETE http://www.test.com/lemon //删除
```

不符合REST规范的写法：

```http
POST http://www.test.com/Createlemon  // 创建
POST http://www.test.com/Querylemon   // 查询
POST http://www.test.com/Modifylemon  // 修改
POST http://www.test.com/Deletelemon  //删除
```



#### 状态码

服务端消息响应携带状态码，指示客户端进行下一步处理。符合 `RESTful` 规范的接口返回状态码都是通用的，不需要额外约定，利用`HTTP Status Code 状态码` 表示请求处理结果，降低了微服务间互操作成本。

| 状态码 | 状态码含义                                     |
| ------ | ---------------------------------------------- |
| 2xx    | 成功，操作被成功接收并处理                     |
| 3xx    | 重定向，需要进一步的操作以完成请求             |
| 4xx    | 客户端错误，请求包含语法错误或无法完成请求     |
| 5xx    | 服务器错误，服务器在处理请求的过程中发生了错误 |

下面是常见的`HTTP`状态码：

- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 404 - 请求的资源（网页等）不存在
- 500 - 内部服务器错误



#### 无状态 

`RESTful`接口要求是「无状态」。无状态指的是任意一个Web请求必须完全与其他请求隔离，当客户端发起请求时，消息本身包含了服务端识别这一请求上下文所需的全部信息。



##### 无状态不是真的没有状态

接口「无状态」更确切的说是服务端无状态，整个会话还是需要状态维持的。要完成一个业务流程，一般客户端与服务端需要多次的消息交互，我们知道`HTTP` 协议是「无状态协议」，这就需要服务端能够识别几个独立 `HTTP` 请求的「状态信息」，从而将他们关联到一个业务流程中。

还是举例子银行系统取款的例子：

- 用户lemon要登录银行系统，首先需要在登录页面输入用户名和密码，这时候产生一个登录请求
- 服务端收到登录请求，执行登录逻辑并返回操作结果
- lemon登录之后点击取款100万，产生一个取款请求
- 服务端收到取款请求，执行取款逻辑并返回操作结果

![取款业务流程](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LTZhYmRhZjczMDI5ZmIwZGQucG5n?x-oss-process=image/format,png)


这里有个问题，服务端在不同时间点收到登录请求和取款请求，这两个请求都是用户 `lemon` 产生的，如果不在技术层面做对独立的 `HTTP` 请求做关联的话，服务端就无法知道这两个请求其实是都是用户`lemon` 「取款业务」的组成部分。



##### 技术方案

服务端要能识别请求的「状态信息」，有两种技术方案：

1. `Session` 方式。服务端保存会话状态，客户端每次请求携带`session-id`。

   服务端维护一个会话状态信息列表，用`session-id`唯一标识一个状态信息，`session-id`一般包含在`HTTP`响应的`Set-Cookie`头部返回给客户端，后续客户端请求携带包含`session-id`信息的`cookie`头部，服务端解析`cookie`取出`session-id`，去维护的状态列表中取回该消息对应的状态信息，这样就把无状态的`HTTP`变成有状态的了。

![session会话](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LTA1MGExMDA2NzJiZThhNmIucG5n?x-oss-process=image/format,png)


2. `Token` 方式。服务端不保存会话状态，客户端每次请求都携带完整的会话状态信息（一般是加密的）给服务端。

   `Token`也称作是「令牌」或临时证书签名，状态信息都被加密到`token`中，这样每当服务器收到请求后解密`token`就能获取该请求对应的状态信息，也就能把不同的请求消息关联到同一个业务流程中来，和`session`方式有类似的效果，只不过这次的状态信息不保存在服务端。

![Token会话](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LTIyOGM5YjU3NTgyODYwNTMucG5n?x-oss-process=image/format,png)


以上两种实现中，第一种 `Session` 方式是有状态的，第二种 `Token` 方式是无状态的。

如果你要实现 `RESTful` 接口最好按第二种技术方案实现，当然要实现无状态也还有其他方式，思路都是「服务端不保持会话状态」就对了。



##### 为什么要无状态

为了高可用性和负载均衡需求，多个微服务通过负载均衡实现分布式集群化部署，集群中每个服务都是独立和对等的。如果服务器在收到客户端请求之时不可用或者宕机，无状态请求可以由任何其他可用服务器处理并作出应答，这在分布式应用中非常重要。

![REST无状态接口](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy83ODQyNDY0LTEwNzM5NGM1MjY1N2JjOTgucG5n?x-oss-process=image/format,png)


想象一下如果服务端保存状态，一个事务内的每个请求都必须落到同一台服务器去处理，这就失去了分布式的意义和优势。

所以， `RESTful` 接口要求是无状态的，是为了更好的适应分布式业务场景，发挥微服务集群优势。



### REST 和 RPC

这两个概念经常出现在微服务架构设计中，`REST` 是一种软件架构接口设计风格，`RPC` 是一种计算机通信协议，看起来是两个不同的概念，要把他们放在一起比较的话，我个人倾向于把 `REST` 具体化为一种基于`HTTP` 并按照 `REST` 约束设计的通信协议，两个通信协议之间还是可以比较一下的。

#### 回顾下RPC

`RPC (Remote Procedure Call)`远程过程调用是一个计算机通信协议。我们一般的程序调用是本地程序内部的调用，`RPC`允许你像调用本地函数一样去调用另一个程序的函数，这中间会涉及网络通信和进程间通信，但你无需知道实现细节，`RPC`框架为你屏蔽了底层实现。`RPC` 是一种服务器-客户端`Client/Serv er`模式，经典实现是一个通过发送请求-接受回应进行信息交互的系统。

#### 适用场景

很多 `RPC` 框架提供的消息传输都是基于二进制的，比如`Thrift`、`Protocol buffers`。这样做的好处是消息结构比较紧凑，对于频繁调用或者大流量、低时延要求的应用场景，能够显著减少网络开销；另一个约束是某些 `RPC` 框架有很强的技术耦合性，比如 `Dubbo` 只能用于 `java` 技术栈。综上，`RPC ` **更加适用于系统内部微服务之间的高效通信。**

`RESTful`接口由于提供了统一的基于 `HTTP `的 `REST` 设计标准，只需 `web` 框架支持 `HTTP` 协议，并设计`RESTful` 风格的接口即可，极大的方便了第三方服务接入调用，**适合用于微服务系统对外暴露的接口设计标准。**



### 写在最后

本文是微服务架构设计中接口选型的一个小方面，很多人会觉得现在工作面试，不管是大厂还是小公司，都是面试造飞机，工作拧螺丝。个人认为即使你在入职之后接触不到架构方面的工作，也要有一颗架构的心，高度决定认知，如果只盯着手上的那颗螺丝那和咸鱼有什么区别？

老规矩。感谢各位的阅读，文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习。

好了，今天的技术分享就到这里，本文是后端开发微服务设计系列的第二篇，这个系列应该还会继续更新，我们下期再见。

**原创不易，看到这里，如果在我这有一点点收获，就动动手指「在看」「转发」是对我持续创作的最大支持。**



### Reference

微服务设计 https://book.douban.com/subject/26772677/

Representational State Transfer (REST) https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

RPC和RESTful API入门篇 https://juejin.im/post/5c19f94fe51d45069e53c03c  

那些年，我们一起误解过的REST  https://juejin.im/post/5b92475a5188255c5644819a   

理解RESTful架构 http://www.ruanyifeng.com/blog/2011/09/restful.html

彻底弄懂session，cookie，token https://segmentfault.com/a/1190000017831088