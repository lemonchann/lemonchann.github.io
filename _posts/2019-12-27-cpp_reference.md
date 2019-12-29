---
layout: post
title: "腾讯后台开发面试笔试C++知识点参考笔记"
date:   2019-12-29
tags: [c++]
comments: true
author: lemonchann
---

文章是由自己笔试面试腾讯的笔记整理而来，整理的时候又回顾了一遍，中间工作忙断断续续整理了半个月，才完成现在的样子。主要是针对面试的C++后台开发岗位，涵盖了大部分C++相关的可能会被问到的技术点，作为面试技术的参考回头查阅。

这篇笔记是基础C++知识点总结，没有过多的阐述后台开发的系统架构和分布式后台服务设计相关，还有c++11新特性，这些笔试面试也会被问到但不在这篇讨论范围，可以关注专栏后面如果有机会再补上。

### 为什么析构函数要是虚函数？

基类指针可以指向派生类的对象（多态性），如果删除该指针delete []p；就会调用该指针指向的派生类析构函数，而派生类的析构函数又自动调用基类的析构函数，这样整个派生类的对象完全被释放。如果析构函数不被声明成虚函数，则编译器实施静态绑定，在删除基类指针时，只会调用基类的析构函数而不调用派生类析构函数，这样就会造成派生类对象析构不完全。所以，将析构函数声明为虚函数是十分必要的。

### gdb调试命令

#### step和next的区别？

当前line有函数调用的时候,next会直接执行到下一句 ,step会进入函数.

#### 查看内存

(gdb)p &a //打印变量地址

gdb）x 0xbffff543 //查看内存单元内变量

0xbffff543: 0x12345678

(gdb) x /4xb 0xbffff543 //单字节查看4个内存单元变量的值

0xbffff543: 0x78 0x56 0x34 0x12

#### 多线程调试

(gdb) info threads：查看GDB当前调试的程序的各个线程的相关信息

(gdb) thread threadno：切换当前线程到由threadno指定的线程

break filename:linenum thread all   在所有线程相应行设置断点，注意如果主线程不会执行到该行，并且启动all-stop模式，主线程执行n或s会切换过去

set scheduler-locking off|on\step    默认off，执行s或c其它线程也同步执行。on，只有当前相称执行。step，只有当前线程执行

show scheduler-locking          显示当前模式

thread apply all command        每个线程执行同意命令，如bt。或者thread apply 1 3 bt，即线程1，3执行bt。

#### 查看调用堆栈

(gdb)bt 

(gdb)f 1 帧简略信息

(gdb)info f 1 帧详细信息

#### 断点

b test.cpp:11

b test.cpp:main

gdb attach 调试方法：

gdb->file xxxx->attach pid->这时候进程是停止的->c 继续运行

#### 带参数调试

输入参数命令set args 后面加上程序所要用的参数，注意，不再带有程序名，直接加参数，如：

(gdb)set args -l a -C abc

#### list命令

list　linenum　　显示程序第linenum行的周围的程序

list　function　　显示程序名为function的函数的源程序



### static关键字的作用



### 软硬链接 

ln -s 源文件 目标文件, ln -s / /home/good/linkname链接根目录/到/home/good/linkname 

1、软链接就是：“ln –s 源文件 目标文件”，只会在选定的位置上生成一个文件的镜像，不会占用磁盘空间，类似与windows的快捷方式。

2、硬链接ln源文件目标文件，没有参数-s， 会在选定的位置上生成一个和源文件大小相同的文件，无论是软链接还是硬链接，文件都保持同步变化。



### 函数指针  

函数指针 int (*func)(int, int)

函数指针数组 int (*funcArry[10])(int, int)

const int* p; 指向const int的指针

int const* p; 同上

int* const p; const指针

 

### 设计模式 

[单例模式](http://blog.csdn.net/wuzhekai1985/article/details/6665869)

[观察者模式(也叫发布订阅模式](http://blog.csdn.net/wuzhekai1985/article/details/6674984))

[工厂模式](http://blog.csdn.net/wuzhekai1985/article/details/6660462) 三种：简单工厂模式、工厂方法模式、抽象工厂模式

为什么要用工厂模式？原因就是对上层的使用者隔离对象创建的过程；或者是对象创建的过程复杂，

使用者不容易掌握；或者是对象创建要满足某种条件，这些条件是业务的需求也好，是系统约束也好

，没有必要让上层使用者掌握，增加别人开发的难度。所以，到这时我们应该清楚了，无论是工厂模式，

还是上面的战友说的开闭原则，都是为了隔离一些复杂的过程，使得这些复杂的过程不向外暴露，

如果暴露了这些过程，会对使用者增加麻烦，这也就是所谓的团队合作。

###  数据结构

#### [各种排序算法](http://blog.csdn.net/daguairen/article/details/52611874)

#### [堆排序](https://www.cnblogs.com/0zcl/p/6737944.html)

关键：1.初始建堆从最后一个非叶节点开始调整 2.筛选从顶点开始往下调整

####  [通俗易懂的快排]( http://blog.csdn.net/vayne_xiao/article/details/53508973)

#### 二叉树定理

度为2节点数 = 叶子节点数 - 1

证明：树枝数=节点数-1， n0*0 +n1*1 +n2*2 = n0+n1+n2-1 (n0代表度为0的节点数，以此类推)



### 互斥锁

```c
pthread_mutex_t m_mutex;
pthread_mutex_init(&m_mutex, NULL)等效于pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER
pthread_mutex_lock(&m_mutex);
pthread_mutex_unlock(&m_mutex)
pthread_mutex_destroy(&m_mutex)
int pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine) (void *), void *arg);
bool g_flag = false;
void* t1(void* arg)
{
  cout << "create t1 thread success" << endl;
  pthread_mutex_lock(&m_mutex);
  g_flag = true;
  pthread_mutex_unlock(&m_mutex);
}

void* t2(void* arg)
{
  cout << "create t2 thread success" << endl;
  pthread_mutex_lock(&m_mutex);
  g_flag = false;
  pthread_mutex_unlock(&m_mutex);
}

int main(int argc, char* argv[])
{
  pthread_t tid1, tid2;
  pthread_create(&tid1, NULL, t1, NULL);
  sleep(2);
  pthread_create(&tid2, NULL, t2, NULL);
  pthread_join(tid1, NULL);
  pthread_join(tid2, NULL);
}
```



### 大小端转换

```c
#define BigLittleSwap32(A) ((((uint32)(A) & 0xff000000) >> 24) | \
                     (((uint32)(A) & 0x00ff0000) >> 8) | \
                     (((uint32)(A) & 0x0000ff00) << 8) | \
                     (((uint32)(A) & 0x000000ff) << 24))
```



###  io多路复用

[为什么 IO 多路复用要搭配非阻塞IO]( https://www.zhihu.com/question/37271342)

设置非阻塞 `io fcntl(sockfd, F_SETFL, O_NONBLOCK); `

#### select

```c
int select(int nfds, fd_set *readfds, fd_set *writefds, fd_set *exceptfds, struct timeval *timeout);

void FD_CLR(int fd, fd_set *set);

int FD_ISSET(int fd, fd_set *set);

void FD_SET(int fd, fd_set *set);

void FD_ZERO(fd_set *set);

fd_set rdfds;
struct timeval tv;
int ret;
FD_ZERO(&rdfds);
FD_SET(socket, &rdfds);
tv.tv_sec = 1;
tv.tv_uses = 500;
ret = select (socket + 1, %rdfds, NULL, NULL, &tv);
if(ret < 0) perror (“select”);
else if (ret = = 0) printf(“time out”);
else
{
	printf(“ret = %d/n”,ret);
	if(FD_ISSET(socket, &rdfds)){
  	/* 读取socket句柄里的数据 */
}注意select函数的第一个参数，是所有加入集合的句柄值的最大那个那个值还要加1.比如我们创建了3个句柄;
```



#### poll实现

poll的实现和select非常相似，只是描述fd集合的方式不同，poll使用pollfd结构而不是select的fd_set结构，其他的都差不多,管理多个描述符也是进行轮询，根据描述符的状态进行处理，但是poll没有最大文件描述符数量的限制。poll和select同样存在一个缺点就是，包含大量文件描述符的数组被整体复制于用户态和内核的地址空间之间，而不论这些文件描述符是否就绪，它的开销随着文件描述符数量的增加而线性增大。 

#### epoll原理

https://www.cnblogs.com/Anker/archive/2013/08/17/3263780.html

```c
#include <sys/epoll.h>
int epoll_create(int size);

int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);

int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout);
```

**epoll对文件描述符的操作有两种模式：LT（level trigger）和ET（edge trigger）。LT模式是默认模式，LT模式与ET模式的区别如下：**

LT模式：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，应用程序可以不立即处理该事件。下次调用epoll_wait时，会再次响应应用程序并通知此事件。    

ET模式：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，应用程序必须立即处理该事件。如果不处理，下次调用epoll_wait时，不会再次响应应用程序并通知此事件。

ET模式在很大程度上减少了epoll事件被重复触发的次数，因此效率要比LT模式高。epoll工作在ET模式的时候，

必须使用非阻塞套接口，以避免由于一个文件句柄的阻塞读/阻塞写操作把处理多个文件描述符的任务饿死。

Epoll ET模型下，为什么每次EPOLLIN事件都会带一次EPOLLOUT事件： https://bbs.csdn.net/topics/390630226

 

#### udp套接字

 [ref1](http://blog.csdn.net/chenhanzhun/article/details/41914029)

 [ref1](https://www.cnblogs.com/bleopard/p/4004916.html)

```c
#include <sys/socket.h> 

ssize_t sendto(int sockfd, void *buff, size_t nbytes, int flags,  const struct sockaddr *destaddr, socklen_t addrlen); 

ssize_t recvfrom(int sockfd, void *buff, size_t nbytes, int flags,  struct sockaddr *addr, socklen_t *addrlen); 
```



###  网络套接字

#### udp原理与套接字                

udp服务端:

```c
sockListener=socket(AF_INET,SOCK_DGRAM,0)

bind(sockListener,(struct sockaddr*)&addrListener,sizeof(addrListener))

nMsgLen=recvfrom(sockListener,szBuf,1024,0,(struct sockaddr*)&addrClient,&addrLen)   
```

udp客户端

```c
sockClient=socket(AF_INET,SOCK_DGRAM,0);
bind(sockClient,(struct sockaddr*)&addrLocal,sizeof(addrLocal))
FD_ZERO(&setHold);
FD_SET(STDIN_FILENO,&setHold);
FD_SET(sockClient,&setHold);
cout<<"you can type in sentences any time"<<endl;
while(true)
{
    setTest=setHold;
    nReady=select(sockClient+1,&setTest,NULL,NULL,NULL);
    if(FD_ISSET(0,&setTest))
    {
        nMsgLen=read(0,szMsg,1024);
        write(sockClient,szMsg,nMsgLen);
    }
    if(FD_ISSET(sockClient,&setTest))
    {
        nMsgLen=read(sockClient,szRecv,1024);
        szRecv[nMsgLen]='\0';
        cout<<"read:"<<szRecv<<endl;
    }
}    
```

**UDP中使用 connect 函数成为已连接的套接字**

已连接 UDP 套接字 相对于 未连接 UDP 套接字 会有以下的变化：

1. 不能给输出操作指定目的 IP 地址和端口号（因为调用 connect 函数时已经指定），即不能使用 sendto 函数，而是使用 write 或 send 函数。写到已连接 UDP 套接字上的内容都会自动发送到由 connect 指定的协议地址；

2. 不必使用 recvfrom 函数以获悉数据报的发送者，而改用 read、recv 或 recvmsg 函数。在一个已连接 UDP 套接字上，由内核为输入操作返回的数据报只有那些来自 connect 函数所指定的协议地址的数据报。目的地为这个已连接 UDP 套接字的本地协议地址，发源地不是该套接字早先 connect 到的协议地址的数据报，不会投递到该套接字。即只有发源地的协议地址与 connect 所指定的地址相匹配才可以把数据报传输到该套接字。这样已连接 UDP 套接字只能与一个对端交换数据报；

3. 由已连接 UDP 套接字引发的异步错误会返回给它们所在的进程，而未连接 UDP 套接字不会接收任何异步错误；

####  [tcp套接字](http://blog.csdn.net/fly_yr/article/details/50387065) 

服务端：

```c
listenfd = socket(AF_INET , SOCK_STREAM , 0)

bind(listenfd , (struct sockaddr*)&servaddr , sizeof(servaddr))

listen(listenfd , LISTENQ)

connfd = accept(listenfd , (struct sockaddr *)&cliaddr , &clilen))

n = read(connfd , buff , MAX_LINE)

write(connfd , buff , n)
```

客户端：

```c
sockfd = socket(AF_INET , SOCK_STREAM , 0)

connect(sockfd , (struct sockaddr *)&servaddr , sizeof(servaddr))

write(sockfd , sendline , strlen(sendline))
```

![tcp握手](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/tcp%E6%8F%A1%E6%89%8B%E4%B8%8E%E5%A5%97%E6%8E%A5%E5%AD%97%E5%AF%B9%E5%BA%94.png)

 

#### IP分片与重组

[参考1](blog.csdn.net/snowsnowsnow1991/article/details/52511280)

[参考2](https://www.cnblogs.com/glacierh/p/3653442.html)

MTU是1500是指的以太网的MTU，可以用 netstat -i 命令查看这个值。如果IP层有数据包要传，而且数据包的长度超过了MTU，

那么IP层就要对数据包进行分片（fragmentation）操作，使每一片的长度都小于或等于MTU。

我们假设要传输一个UDP数据包，以太网的MTU为1500字节，一般IP首部为20字节，UDP首部为8字节，数据的净荷（payload）

部分预留是1500-20-8=1472字节。如果数据部分大于1472字节，就会出现分片现象，

偏移量的单位为8Byte

以ID标示是不是同一个分片，以偏移量标示在保文里的位置，每个不完整的ID报文有一个等待计时器，到时丢弃IP层不保证能够送达，

如果丢了上层自己处理参考rfc 791

IP报文长度单位口诀

> 4字节单位- 首部长度单位 1字节单位-总长度单位  8字节单位-片偏移单位

### STL容器

#### vector与list

1.vector数据结构

vector和数组类似，拥有一段连续的内存空间，并且起始地址不变。

因此能高效的进行随机存取，时间复杂度为o(1);

但因为内存空间是连续的，所以在进行插入和删除操作时，会造成内存块的拷贝，时间复杂度为o(n)。

另外，当数组中内存空间不够时，会重新申请一块内存空间并进行内存拷贝。

 2.list数据结构

list是由双向链表实现的，因此内存空间是不连续的。

只能通过指针访问数据，所以list的随机存取非常没有效率，时间复杂度为o(n);

但由于链表的特点，能高效地进行插入和删除。

####  [Vector动态内存分配]( https://blog.csdn.net/xnmc2014/article/details/86748138)

这个问题其实很简单，在调用push_back时，若当前容量已经不能够放入心得元素（capacity=size），那么vector会重新申请一块内存，把之前的内存里的元素拷贝到新的内存当中，然后把push_back的元素拷贝到新的内存中，最后要析构原有的vector并释放原有的内存。所以说这个过程的效率是极低的，为了避免频繁的分配内存，C++每次申请内存都会成倍的增长，例如之前是4，那么重新申请后就是8，以此类推。当然不一定是成倍增长，比如在我的编译器环境下实测是0.5倍增长，之前是4，重新申请后就是6

[TinySTL]( https://github.com/zouxiaohang/TinySTL/tree/master/TinySTL)



### 预处理指令

\#pragma once 防止头文件重复引用

一字节对齐

\#pragma pack(push, 1)

\#pragma pack(pop)

 

### class面向对象

#### 类继承

class LayerManager : public ILayerManager｛｝;

 

#### 覆盖虚函数机制

在某些情况下，希望覆盖虚函数机制并强制函数调用使用虚函数的特定版

本，这里可以使用作用域操作符：

Item_base *baseP = &derived;

// calls version from the base class regardless of the dynamic type

of baseP

double d = baseP->Item_base::net_price(42);

这段代码强制将 net_price 调用确定为 Item_base 中定义的版本，该调用

将在编译时确定。

只有成员函数中的代码才应该使用作用域操作符覆盖虚函数机制。

为什么会希望覆盖虚函数机制？最常见的理由是为了派生类虚函数调用基

类中的版本。在这种情况下，基类版本可以完成继承层次中所有类型的公共任务，

而每个派生类型只添加自己的特殊工作。例如，可以定义一个具有虚操作的 Camera 类层次。Camera 类中的 display

函数可以显示所有的公共信息，派生类（如 PerspectiveCamera）可能既需要显

示公共信息又需要显示自己的独特信息。可以显式调用 Camera 版本以显示公共

信息，而不是在 PerspectiveCamera 的 display 实现中复制 Camera 的操作。

在这种情况下，已经确切知道调用哪个实例，因此，不需要通过虚函数机制。

派生类虚函数调用基类版本时，必须显式使用作用域操作符。

如果派生类函数忽略了这样做，则函数调用会在运行时确定并

且将是一个自身调用，从而导致无穷递归。

 

#### 名字冲突与继承

虽然可以直接访问基类成员，就像它是派生类成员一样，但是成员保留了它

的基类成员资格。一般我们并不关心是哪个实际类包含成员，通常只在基类和派

生类共享同一名字时才需要注意。

与基类成员同名的派生类成员将屏蔽对基类成员的直接访问。

```c
struct Base
{
    Base(): mem(0) { }
    protected:
    int mem;
};

struct Derived : Base 
{
    Derived(int i): mem(i) { } // initializes Derived::mem
    int get_mem() { return mem; } // returns Derived::mem
    protected:
    int mem; // hides mem in the base
};

get_mem 中对 mem 的引用被确定为使用 Derived 中的名字。如果编写如下代码：
Derived d(42);
cout << d.get_mem() << endl; // prints 42
```

则输出将是 42。

使用作用域操作符访问被屏蔽成员

可以使用作用域操作符访问被屏蔽的基类成员：

```c
struct Derived : Base 
{
	int get_base_mem() { return Base::mem; }
};
```

作用域操作符指示编译器在 Base 中查找 mem。

设计派生类时，只要可能，最好避免与基类数据成员的名字相同

#### 类成员函数的重载、覆盖和隐藏区别？

a.成员函数被重载的特征：

（1）相同的范围（在同一个类中）；

（2）函数名字相同；

（3）参数不同；

（4）virtual 关键字可有可无。

b.覆盖是指派生类函数覆盖基类函数，特征是：

（1）不同的范围（分别位于派生类与基类）；

（2）函数名字相同；

（3）参数相同；

（4）基类函数必须有virtual 关键字。

c.“隐藏”是指派生类的函数屏蔽了与其同名的基类函数，规则如下：

（1）如果派生类的函数与基类的函数同名，但是参数不同。此时，不论有无virtual关键字，基类的函数将被隐藏（注意别与重载混淆，仅同名就可以）。

（2）如果派生类的函数与基类的函数同名，并且参数也相同，但是基类函数没有virtual 关键字。此时，基类的函数被隐藏（注意别与覆盖混淆）

 

#### 纯虚函数

```c
class Disc_item : public Item_base 

{
    public:
    double net_price(std::size_t) const = 0;
};
```

含有（或继承）一个或多个纯虚函数的类是抽象基类。除了作

为抽象基类的派生类的对象的组成部分，甚至不能创建抽象类型Disc_item的对象。

 

### 模板编程

#### 函数模板

```c
template <typename T> 
int compare(const T &v1, const T &v2)
{
    if (v1 < v2) return -1;
    if (v2 < v1) return 1;
    return 0;
}

```

使用compare(1, 2) 

#### 类模板

```c
template <class Type> class Queue 

{

public:

    Queue (); // default constructor
    Type &front (); // return element from head of Queue
    const Type &front () const;
    void push (const Type &); // add element to back of Queue
    void pop(); // remove element from head of Queue
    bool empty() const; // true if no elements in the Queue
    private:
    // ...
};
```

使用Queue<int> qi;



### 操作符重载

#### 输出操作符

输出操作符通常是非成员函数，定义成类的友元

```c
friend ostream& operator<<(ostream& out, const Sales_item& s)
{
    out << s.isbn << "\t" << s.units_sold << "\t"
    << s.revenue << "\t" << s.avg_price();
    return out;
}
```

#### 算术和关系操作

算术和关系操作符定义为非成员函数

 为了与内置操作符保持一致，加法返回一个右值，而不是一个引用。

```c
Sales_item operator+(const Sales_item& lhs, const Sales_item& rhs)

{

    Sales_item ret(lhs); // copy lhs into a local object that we'll
    ret += rhs; // add in the contents of rhs
    return ret; // return ret by value
}

int operator<(const TableIndex2D& right) const;

friend bool operator== (const UEContext& info1,const UEContext& info2) const
{
    if(info1.ContextID != info2.ContextID) return false;
    return true;
｝

friend bool operator!= (const UEContext& info1,const UEContext& info2) const
{
	return !(info1 == info2);
}
```

### 复制控制

**包括，一个拷贝构造函数，一个赋值运算符，一个析构函数，一对取址运算符**

如果你这么写：`class Empty{};`

和你这么写是一样的：

```c
class Empty 
{
    public:
    Empty();            // 缺省构造函数
    Empty(const Empty& rhs);    // 拷贝构造函数
    ~Empty();            // 析构函数 ---- 是否
             // 为虚函数看下文说明
     Empty& operator=(const Empty& rhs);  // 赋值运算符
     Empty* operator&();       // 取址运算符
     const Empty* operator&() const;
};

Empty(const Empty& rhs)
{
    a = rhs.a
}
```



类赋值操作符必须是类的成员，以便编译器可以知道是否需要合成一个, 赋值必须返回对 *this 的引用。

一般而言，赋值操作符与复合赋值操作符应返回操作符的引用

```c
Guti& Guti::operator=( const Guti& rhs )
{
  mtmsi_m = rhs.mtmsi_m;
  mmeCode_m = rhs.mmeCode_m;
  mmeGid_m = rhs.mmeGid_m;
  plmnId_m = rhs.plmnId_m;
  return *this;
};

注意，检查对自己赋值的情况
c& c::operator=(const c& rhs)
{
 // 检查对自己赋值的情况
 if (this == &rhs) return *this;
 ...
}
```

 

### 构造函数初始化式

初始化const对象和引用对象的唯一机会。P389 C++ Primer 5th



###  协议 

#### RTP/RTSP/RTCP

RTP协议RFC1889和RFC3550 G711 PCMU

#### HTTP

 

### Linux基础

Linux shell之数组：https://www.cnblogs.com/Joke-Shi/p/5705856.html

Linux expr命令：http://www.runoob.com/linux/linux-comm-expr.html

shell中变量类型：local，global，export关键字： https://www.cnblogs.com/kaishirenshi/p/10274179.html

Linux let 命令：http://www.runoob.com/linux/linux-comm-let.html

vim修改tab成4个空格写python: http://www.cnblogs.com/wi100sh/p/4938996.html

python判断文件是否存在的几种方法： https://www.cnblogs.com/jhao/p/7243043.html

python--文件操作删除某行： https://www.cnblogs.com/nopnog/p/7026390.html

pytho3字典遍历的几种操作： https://www.jb51.net/article/138414.htm

 

chmod

命令名称： chmod

执行权限： 所有用户

功能描述： 改变文件或目录权限

语法：     第一种方法   chmod   [{ugoa}{+-=}{rwx}]   [文件或目录]

​          备注：       u：所有者  g：所属组  o：其他人  a：所有人

​                      +：为用户增加权限   -：为用户减少权限   =：为用户赋予权限

​                      r：读权限   w：写权限   x：执行权限 

 

​          第二种方法   chmod  -R  [mode=421]   [文件或目录]   ←（这种方法用的比较多）

​           备注：      r：4  w：2  x：1

​                      r为读权限，可以用4来表示，

​                      w为写权限，可以用2来表示，

​                      x为执行权限，可以用1来表示。

 

### new操作

动态分配数组int *pia = new int[10]; // array of 10 uninitialized ints

释放分配的数组 delete [] pia;

####  new数组

```c
int *arr = new int[1024]
delte [] a
# 堆上new 对象
class MyClass
{
    MyClass(int a) {};
    int empty() {return 0;};
};

MyClass *p = new MyClass(1);
delete p;

# 栈上分配 对象
MyClass test(1);
```

 

#### 放置式new

区分以下几种操作符号：

new operator-普通的new关键字

operator new-仅仅申请内存返回void*

placement new-在指定内存调用构造函数初始化类

new [] operator-如果是类对象，会在首部多申请4字节内存用于保存对象个数

 

深入探究 new 和 delete https://blog.csdn.net/codedoctor/article/details/76187567

当我们使用关键字new在堆上动态创建一个对象A时，比如 A* p = new A()，它实际上做了三件事：

向堆上申请一块内存空间（做够容纳对象A大小的数据）(operator new)

调用构造函数 （调用A的构造函数（如果A有的话））(placement new)

返回正确的指针

当然，如果我们创建的是简单类型的变量，那么第二步会被省略。 

 

当我们delete的时候也是如此，比如我们delete p 的时候，其行为如下：

定位到指针p所指向的内存空间，然后根据其类型，调用其自带的析构函数（内置类型不用）

然后释放其内存空间（将这块内存空间标志为可用，然后还给操作系统）

将指针标记为无效（指向NULL）

 

https://blog.csdn.net/rain_qingtian/article/details/14225211

```c


void* p=::operator new (sizeof(Buffer));  ／／创建一块内存；冒号表示全局的new
Buffer* bp= start_cast<Buffer*>(p);  ／／指针进行装换
Buffer* buf3=new(bp) Buffer(128);   ／／把bp指针指向的内存租借buf3,
buf3->put('c');
buf3->~Buffer();  //这里析够函数要显示调用
::operator delete(p);
```

 

[放置new构造对象数组](https://bbs.csdn.net/topics/392271390)

![放置new对象数组](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E6%94%BE%E7%BD%AEnew%E5%AF%B9%E8%B1%A1.png)



 

在栈上分配类内存： https://www.cnblogs.com/weekbo/p/8533368.html

new与malloc区别

b. new和malloc最大区别: new会调用类的构造函数,malloc不会; 

c. delete和free同理;new/delete是运算符,malloc/free函数。所以new/delete效率应该会高点。

 

### [Linux IPC机制汇总](https://www.cnblogs.com/Jimmy1988/p/7744659.html)

#### 管道

```c
 #include <unistd.h>

无名管道： int pipe(int pipedes[2])

有名管道：int mkfifo(const char *pathname, mode_t mode)
```



#### 消息队列 

```c
#include <sys/msg.h>

int msgget(key_t key, int msgflg) //创建

int msgctl(int msqid, int cmd, struct msqid_ds *buf) //设置/获取消息队列的属性值

int msgsnd(int msqid, const void *msgp, size_t msgsz, int msgflg) //发送消息到消息队列(添加到尾端)

ssize_t msgrcv(int msqid, void *msgp, size_t msgsz, long msgtyp, int msgflg) //接收消息
```



#### 共享内存 

```c
#include <sys/shm.h>

int shmget(key_t key, size_t size, int shmflg) //创建一个共享内存空间

int shmctl(int shmid, int cmd, struct shmid_ds *buf) //对共享内存进程操作，包括：读取/设置状态，删除操作

void *shmat(int shmid, const void *shmaddr, int shmflg) //将共享内存空间挂载到进程中

int shmdt(const void *shmaddr) //将进程与共享内存空间分离 **(****只是与共享内存不再有联系，并没有删除共享内存****)**
```



#### 信号

` #include</usr/include/bits/signum.h>`



### 手动实现strcpy

```c
char *strcpy(char *strDest, const char *strSrc)
{
    if ( strDest == NULL || strSrc == NULL)
    return NULL ;
    if ( strDest == strSrc)
    return strDest ;
    char *tempptr = strDest ;
    while( (*strDest++ = *strSrc++) != ‘/0’)
    return tempptr ;
}
```



### C++对象内存布局

这部分详细内容可以参考[深度探索C++对象模型](https://book.douban.com/subject/10427315/)

#### 虚函数多态机制

通过虚表指针访问虚成员函数，对普通成员函数的访问区别于虚成员函数。具体如下：

virtual member function虚成员函数normalize()的调用实际上转换成：

(*ptr->vpter[1])(ptr)

![](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E6%88%90%E5%91%98%E8%99%9A%E5%87%BD%E6%95%B0%E6%8C%87%E9%92%88.png)

函数指针也有差别，下面第一个是普通函数指针或者static member function。第二个是non-static member function成员函数指针。

![](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E6%88%90%E5%91%98%E5%87%BD%E6%95%B0%E6%8C%87%E9%92%88.png)



#### 不同继承层次的对象内存布局

##### 单一继承

![单一继承](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E5%8D%95%E4%B8%80%E7%BB%A7%E6%89%BF.png)

![单一继承1](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E5%8D%95%E4%B8%80%E7%BB%A7%E6%89%BF1.png)

 

##### 多重继承

![多重继承](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF.png)

![多重继承1](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF1.png)

![多重继承2](https://github.com/lemonchann/lemonchann.github.io/raw/master/images/2019-12-27-cpp_reference/%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF2.png)

 

### 参考

[常见C++笔试题](http://blog.csdn.net/dongfengsun/article/details/1541926)