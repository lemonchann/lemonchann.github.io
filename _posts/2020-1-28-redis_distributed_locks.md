---
layout: post
title: "redis分布式锁3种实现方式分析"
date:   2020-1-28
tags: [后台开发]
comments: true
author: lemonchann
---

大家春节在家抢红包玩的不亦乐乎，简单的抢红包动作看起来非常简单，实际上要做好这个服务，特别是money相关服务是不允许出错的，想想看每个红包的数字都是真金白银，要求服务的鲁棒性非常高，背后包含的很多后台服务技术细节可以写。

<!-- more -->

抛砖引玉，今天就来说说其中一个技术细节，也是在我的上一篇文章[Linux后台开发C++学习路线技能加点](https://zhuanlan.zhihu.com/p/102048769)中提到但没展开讲的高并发编程中的**redis分布式锁**。

这里罗列出**3种redis实现的分布式锁**，并分别对比说明各自特点。



## Redis单实例分布式锁

### 实现一： SETNX实现的分布式锁

setnx用法参考redis[官方文档](https://redis.io/commands/setnx)

#### 语法

`SETNX key value`

将`key`设置值为`value`，如果`key`不存在，这种情况下等同SET命令。 当`key`存在时，什么也不做。`SETNX`是”**SET** if **N**ot e**X**ists”的简写。

返回值：

- 1 设置key成功
- 0 设置key失败

#### 加锁步骤

1. ```SETNX lock.foo <current Unix time + lock timeout + 1>```

   如果客户端获得锁，`SETNX`返回`1`，加锁成功。

   如果`SETNX`返回`0`，那么该键已经被其他的客户端锁定。

2. 接上一步，`SETNX`返回`0`加锁失败，此时，调用`GET lock.foo`获取时间戳检查该锁是否已经过期：

   - 如果没有过期，则休眠一会重试。

   - 如果已经过期，则可以获取该锁。具体的：调用`GETSET lock.foo <current Unix timestamp + lock timeout + 1>`基于当前时间设置新的过期时间。

     **注意**: 这里设置的时候因为在`SETNX`与`GETSET`之间有个窗口期，在这期间锁可能已被其他客户端抢去，所以这里需要判断`GETSET`的返回值，他的返回值是SET之前旧的时间戳：

     - 若旧的时间戳已过期，则表示加锁成功。
     - 若旧的时间戳还未过期（说明被其他客户端抢去并设置了时间戳），代表加锁失败，需要等待重试。

#### 解锁步骤

解锁相对简单，只需`GET lock.foo`时间戳，判断是否过期，过期就调用删除`DEL lock.foo` 



### 实现二：SET实现的分布式锁

set用法参考[官方文档](https://redis.io/commands/set)

#### 语法

`SET key value [EX seconds|PX milliseconds] [NX|XX]`

将键`key`设定为指定的“字符串”值。如果 `key` 已经保存了一个值，那么这个操作会直接覆盖原来的值，并且忽略原始类型。当`set`命令执行成功之后，之前设置的过期时间都将失效。

从2.6.12版本开始，redis为`SET`命令增加了一系列选项:

- `EX` *seconds* – Set the specified expire time, in seconds.
- `PX` *milliseconds* – Set the specified expire time, in milliseconds.
- `NX` – Only set the key if it does not already exist.
- `XX` – Only set the key if it already exist.
- `EX` *seconds* – 设置键key的过期时间，单位时秒
- `PX` *milliseconds* – 设置键key的过期时间，单位时毫秒
- `NX` – 只有键key不存在的时候才会设置key的值
- `XX` – 只有键key存在的时候才会设置key的值

版本\>= 6.0

- `KEEPTTL` -- 保持 key 之前的有效时间TTL

#### 加锁步骤

一条命令即可加锁: `SET resource_name my_random_value NX PX 30000`

The command will set the key only if it does not already exist (NX option), with an expire of 30000 milliseconds (PX option). The key is set to a value “my*random*value”. This value must be unique across all clients and all lock requests.

这个命令只有当`key` 对应的键不存在resource_name时（NX选项的作用）才生效，同时设置30000毫秒的超时，成功设置其值为my_random_value，这是个在所有redis客户端加锁请求中全局唯一的随机值。

#### 解锁步骤

解锁时需要确保my_random_value和加锁的时候一致。下面的Lua脚本可以完成

```lau
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
```

这段Lua脚本在执行的时候要把前面的`my_random_value`作为`ARGV[1]`的值传进去，把`resource_name`作为`KEYS[1]`的值传进去。释放锁其实包含三步操作：’GET’、判断和’DEL’，用Lua脚本来实现能保证这三步的原子性。



## Redis集群分布式锁



### 实现三：Redlock 

前面两种分布式锁的实现都是针对单redis master实例，既不是有互为备份的slave节点也不是多master集群，如果是redis集群，每个redis master节点都是独立存储，这种场景用前面两种加锁策略有锁的安全性问题。

比如下面这种场景：

> 1. 客户端1从Master获取了锁。
> 2. Master宕机了，存储锁的key还没有来得及同步到Slave上。
> 3. Slave升级为Master。
> 4. 客户端2从新的Master获取到了对应同一个资源的锁。
>
> 于是，客户端1和客户端2同时持有了同一个资源的锁。锁的安全性被打破。

针对这种多redis服务实例的场景，redis作者antirez设计了**Redlock** （Distributed locks with Redis）算法，就是我们接下来介绍的。

### 加锁步骤

**集群加锁的总体思想是尝试锁住所有节点，当有一半以上节点被锁住就代表加锁成功。集群部署你的数据可能保存在任何一个redis服务节点上，一旦加锁必须确保集群内任意节点被锁住，否则也就失去了加锁的意义。**

具体的：

1. 获取当前时间（毫秒数）。
2. 按顺序依次向N个Redis节点执行**获取锁**的操作。这个获取操作跟前面基于单Redis节点的**获取锁**的过程相同，包含随机字符串`my_random_value`，也包含过期时间(比如`PX 30000`，即锁的有效时间)。为了保证在某个Redis节点不可用的时候算法能够继续运行，这个**获取锁**的操作还有一个超时时间(time out)，它要远小于锁的有效时间（几十毫秒量级）。客户端在向某个Redis节点获取锁失败以后，应该立即尝试下一个Redis节点。这里的失败，应该包含任何类型的失败，比如该Redis节点不可用，或者该Redis节点上的锁已经被其它客户端持有（注：Redlock原文中这里只提到了Redis节点不可用的情况，但也应该包含其它的失败情况）。
3. 计算整个获取锁的过程总共消耗了多长时间，计算方法是用当前时间减去第1步记录的时间。如果客户端从大多数Redis节点（>= N/2+1）成功获取到了锁，并且获取锁总共消耗的时间没有超过锁的有效时间(lock validity time)，那么这时客户端才认为最终获取锁成功；否则，认为最终获取锁失败。
4. 如果最终获取锁成功了，那么这个锁的有效时间应该重新计算，它等于最初的锁的有效时间减去第3步计算出来的获取锁消耗的时间。
5. 如果最终获取锁失败了（可能由于获取到锁的Redis节点个数少于N/2+1，或者整个获取锁的过程消耗的时间超过了锁的最初有效时间），那么客户端应该立即向所有Redis节点发起**释放锁**的操作（即前面介绍的Redis Lua脚本）。

### 解锁步骤

客户端向所有Redis节点发起释放锁的操作，不管这些节点当时在获取锁的时候成功与否。

### 算法实现

上面描述的算法已经有现成的实现，各种语言版本。

- [Redlock-rb](https://github.com/antirez/redlock-rb) (Ruby implementation). There is also a [fork of Redlock-rb](https://github.com/leandromoreira/redlock-rb) that adds a gem for easy distribution and perhaps more.
- [Redlock-py](https://github.com/SPSCommerce/redlock-py) (Python implementation).
- [Aioredlock](https://github.com/joanvila/aioredlock) (Asyncio Python implementation).
- [Redlock-php](https://github.com/ronnylt/redlock-php) (PHP implementation).
- [PHPRedisMutex](https://github.com/malkusch/lock#phpredismutex) (further PHP implementation)
- [cheprasov/php-redis-lock](https://github.com/cheprasov/php-redis-lock) (PHP library for locks)
- [Redsync](https://github.com/go-redsync/redsync) (Go implementation).
- [Redisson](https://github.com/mrniko/redisson) (Java implementation).
- [Redis::DistLock](https://github.com/sbertrang/redis-distlock) (Perl implementation).
- [Redlock-cpp](https://github.com/jacket-code/redlock-cpp) (C++ implementation).
- [Redlock-cs](https://github.com/kidfashion/redlock-cs) (C#/.NET implementation).
- [RedLock.net](https://github.com/samcook/RedLock.net) (C#/.NET implementation). Includes async and lock extension support.
- [ScarletLock](https://github.com/psibernetic/scarletlock) (C# .NET implementation with configurable datastore)
- [Redlock4Net](https://github.com/LiZhenNet/Redlock4Net) (C# .NET implementation)
- [node-redlock](https://github.com/mike-marcacci/node-redlock) (NodeJS implementation). Includes support for lock extension.

### 比如我用的C++实现

[源码在这](https://github.com/jacket-code/redlock-cpp)

#### 创建分布式锁管理类CRedLock

```c++
CRedLock * dlm = new CRedLock();
dlm->AddServerUrl("127.0.0.1", 5005);
dlm->AddServerUrl("127.0.0.1", 5006);
dlm->AddServerUrl("127.0.0.1", 5007);
```

#### 加锁并设置超时时间

```c++
CLock my_lock;
bool flag = dlm->Lock("my_resource_name", 1000, my_lock);
```

#### 加锁并保持直到释放

```c++
CLock my_lock;
bool flag = dlm->ContinueLock("my_resource_name", 1000, my_lock);
```

`my_resource_name`是加锁标识；`1000`是锁的有效期，单位毫秒。

#### 加锁失败返回false， 加锁成功返回`Lock`结构如下

```c++
class CLock {
public:
    int m_validityTime; => 9897.3020019531 // 当前锁可以存活的时间, 毫秒
    sds m_resource; => my_resource_name // 要锁住的资源名称
    sds m_val; => 53771bfa1e775 // 锁住资源的进程随机名字
};
```

#### 解锁

```c++
dlm->Unlock(my_lock);
```



## 总结

综上所述，三种实现方式。

- 单redis实例场景，分布式锁实现一和实现二都可以，实现二更简洁推荐用实现二，用实现三也可以，但是实现三有点复杂略显笨重。
- 多redis实例场景推荐用实现三最安全，不过实现三也不是完美无瑕，也有针对这种算法缺陷的讨论（节点宕机同步时延、时间同步假设），大家还需要根据自身业务场景灵活选择或定制自己的分布式锁。



## 参考

[Distributed locks with Redis](https://redis.io/topics/distlock)

[How to do distributed locking](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)

[基于Redis的分布式锁到底安全吗](http://zhangtielei.com/posts/blog-redlock-reasoning.html)