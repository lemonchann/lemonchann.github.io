上一篇文章我们分析了 Linux 内存管理机制，

## 物理页管理

在`Linux `系统中通过分页机制把物理内存划分4K大小的内存页 `Page`（也称作页框`Page Frame`），物理内存的分配和回收都是基于内存页进行，假如系统请求小块内存，可以预先分配一页给他，避免了反复的申请和释放小块内存带来频繁的系统开销。假如系统需要大块内存，则可以用多页内存拼凑，而不必要求大块连续内存。

我们知道无论内核还是进程，当实际需要访问内存的时候，如果虚拟内存没有映射到物理内存，会发生缺页中断，这时候会请求分配物理内存页框。

### 物理页管理面临问题

物理内存页分配会出现外部碎片和内部碎片问题，所谓的「内部」和「外部」是针对页框内外而言，页框内的内存碎片是内部碎片，页框间的碎片是外部碎片。

#### 外部碎片

分配物理内存页的时候会尽量分配连续的内存页面，频繁的分配与回收物理页导致大量的小块内存夹杂在已分配页面中间，形成外部碎片。举个例子：



#### 内部碎片

以页为单位管理和分配内存，这就导致每次分配的都至少是4K大小的页面，而内核中有很多需要以字节为单位分配内存的场景，这样本来只想要几个字节而已却不得不分配一页内存，除去用掉的字节剩下的就形成了内部碎片。 



### 页面管理算法

#### Buddy（伙伴）分配算法

 Linux内核中引入了伙伴系统算法(Buddy system)。把所有的空闲页框分组为11个块链表，每个块链表分别包含大小为1，2，4，8，16，32，64，128，256，512和1024个连续页框的页框块。最大可以申请1024个连续页框，对应4MB大小的连续内存。因为任何正整数都可以由2^n的和组成，所以总能找到合适大小的内存块分配出去，减少了外部碎片产生 。

比如：我需要申请4个页框，但是长度为4个连续页框块链表没有空闲的页框块，伙伴系统会从连续8个页框块的链表获取一个，并将其拆分为两个连续4个页框块，放入连续4个页框块的链表中。释放的时候也一样，会检查释放的这几个页框的之前和之后的物理页框是否空闲，并且能否组成下一级长度的块。 

#### 命令查看

```
[lemon]]# cat /proc/buddyinfo 
Node 0, zone      DMA      1      0      0      0      2      1      1      0      1      1      3 
Node 0, zone    DMA32   3198   4108   4940   4773   4030   2184    891    180     67     32    330 
Node 0, zone   Normal  42438  37404  16035   4386    610    121     22      3      0      0      1 

```



#### slab分配器

伙伴系统分配出去的内存还是以页框为单位，对于内核的很多场景来说还是太大，于是就有了` slab `分配器。

Slab是一种内存分配器，通过将内存划分不同大小的空间分配给对象使用来进行缓存管理，应用于内核对象的缓存。 

slab分配器是基于对象进行管理的，所谓的对象就是内核中的数据结构（例如：`task_struct、file_struct` 等）。相同类型的对象归为一类，每当要申请这样一个对象时，slab分配器就从一个slab列表中分配一个这样大小的单元出去，而当要释放时，将其重新保存在该列表中，而不是直接返回给伙伴系统，从而避免内部碎片。slab分配器并不丢弃已经分配的对象，而是释放并把它们保存在内存中。slab分配对象时，会使用最近释放的对象的内存块，因此其驻留在cpu高速缓存中的概率会大大提高。

- Slab对小对象进行分配，不用为每个小对象分配一个页，节省了空间。
- 内核中一些小对象创建析构很频繁，Slab对这些小对象做缓存，可以重复利用一些相同的对象，减少内存分配次数。

![image-20200421202943561](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200421202943561.png)

kmem_cache是一个cache_chain的链表，描述了一个高速缓存，每个高速缓存包含了一个slabs的列表，这通常是一段连续的内存块。存在3种slab：

- slabs_full(完全分配的slab)
- slabs_partial(部分分配的slab)
- slabs_empty(空slab,或者没有对象被分配)。

slab是slab分配器的最小单位，在实现上一个slab有一个货多个连续的物理页组成（通常只有一页）。单个slab可以在slab链表之间移动，例如如果一个半满slab被分配了对象后变满了，就要从slabs_partial中被删除，同时插入到slabs_full中去。



#### 命令查看

`cat /proc/slabinfo`

![image-20200421203357847](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200421203357847.png)

 `kmalloc() ` 也是基于 SLAB 分配器的，只不过它所需要的管理结构头已经按照 2^n 的大小排列事先准备好了 

可以看到slabinfo的信息有` kmalloc `相关 `slab `对象信息

![image-20200421204315596](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200421204315596.png)

`slabtop`

![image-20200421203542312](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200421203542312.png)



## 三个内存分配函数

### 用户空间malloc

当申请小于 128KB 小内存的时，` malloc `使用  `sbrk` 分配内存；当申请大于 128KB 的内存时，使用 `mmap` 函数申请内存；但是这只是分配了虚拟内存，还没有映射到物理内存，当访问申请的内存时，才会因为缺页异常，内核分配物理内存。 

 由于brk/sbrk/mmap属于系统调用，如果每次申请内存，都调用这三个函数中的一个，那么每次都要产生系统调用开销（即cpu从用户态切换到内核态的上下文切换，这里要保存用户态数据，等会还要切换回用户态），这是非常影响性能的；其次，这样申请的内存容易产生碎片，因为堆是从低地址到高地址，如果低地址的内存没有被释放，高地址的内存就不能被回收。 

因此，` malloc `采用的是内存池的实现方式，malloc内存池实现方式更类似于 STL 分配器和 memcached 的内存池，先申请一大块内存，然后将内存分成不同大小的内存块，然后用户申请内存时，直接从内存池中选择一块相近的内存块即可。 



### 内核空间kmalloc

这个函数用于分配内核空间的虚拟内存

`kmalloc` 按字节为单位虚拟内存，一般用于分配小块内存，释放内存对应于 `kfree` ，可以分配连续的物理内存。函数原型在 `<linux/vmalloc.h>` 中声明。 kmalloc 分配内存是基于slab，因此slab的一些特性包括着色，对齐等都具备，性能较好，一般情况下在驱动程序中都是调用kmalloc()来给数据结构分配内存 。

 kmalloc()分配的内存处于3GB～high_memory之间的直接内存映射区。

### 内核空间vmalloc

`vmalloc` 按字节为单位虚拟内存，一般用分配大块内存，释放内存对应于 `vfree`，分配连续的虚拟内存，但是物理上不一定连续。函数原型在 `<linux/vmalloc.h>` 中声明。 一般用在为活动的交换区分配数据结构，为某些I/O驱动程序分配缓冲区，或为模块分配空间。

vmalloc()分配的内存在VMALLOC_START～4GB之间，也就是非连续的动态内存映射区。



## Reference

linux内核slab机制分析 https://www.jianshu.com/p/95d68389fbd1 

Linux slab 分配器剖析 https://www.ibm.com/developerworks/cn/linux/l-linux-slab-allocator/index.html#table2 

Linux内核内存管理算法Buddy和Slab https://zhuanlan.zhihu.com/p/36140017 

Linux内存之Slab https://fivezh.github.io/2017/06/25/Linux-slab-info/ 

malloc 的实现原理 内存池 mmap sbrk 链表 https://zhuanlan.zhihu.com/p/57863097 

malloc实现原理  http://luodw.cc/2016/02/17/malloc/ 

glibc内存管理那些事儿 https://www.jianshu.com/p/2fedeacfa797 

Kmalloc和Vmalloc的区别 https://www.cnblogs.com/wuchanming/p/4465155.html 



 
