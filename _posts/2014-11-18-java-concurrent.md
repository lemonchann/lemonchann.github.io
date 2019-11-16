---
layout: post
title: Java Concurrent
tags: Java Concurrent
categories: Java
---

* TOC
{:toc}


线程拥有通过程序运行的独立的并发路径，并且每个线程都有自己的程序计数器，称为堆栈和本地变量。线程存在于进程中，它们与同一进程内的其他线程共享内存、文件句柄以及进程状态。

---

JDK 5.0 中的并发改进可以分为三组：

* JVM 级别更改。大多数现代处理器对并发对某一硬件级别提供支持，通常以 **compare-and-swap** （CAS）指令形式。CAS 是一种低级别的、细粒度的技术，它允许多个线程更新一个内存位置，同时能够检测其他线程的冲突并进行恢复。它是许多高性能并发算法的基础。在 JDK 5.0 之前，Java 语言中用于协调线程之间的访问的惟一原语是同步，同步是更重量级和粗粒度的。公开 CAS 可以开发高度可伸缩的并发 Java 类。这些更改主要由 JDK 库类使用，而不是由开发人员使用。

* 低级实用程序类 -- `锁定`和`原子类`。使用 CAS 作为并发原语，**ReentrantLock** 类提供与 synchronized 原语相同的锁定和内存语义，然而这样可以更好地控制锁定（如计时的锁定等待、锁定轮询和可中断的锁定等待）和提供更好的可伸缩性（竞争时的高性能）。大多数开发人员将不再直接使用 ReentrantLock 类，而是使用在 ReentrantLock 类上构建的高级类。

* 高级实用程序类。这些类实现并发构建块，每个计算机科学文本中都会讲述这些类 -- `信号`、`互斥`、`闩锁`、`屏障`、`交换程序`、`线程池`和`线程安全集合类`等。大部分开发人员都可以在应用程序中用这些类来替换许多同步、wait() 和 notify() 的使用，从而提高性能、可读性和正确性。

---

# 线程安全的类

* 首先它必须在单线程环境中正确运行。如果正确实现了类，那么说明它符合规范，对该类的对象的任何顺序的操作（公共字段的读写、公共方法的调用）都不应该：

	* 使对象处于无效状态；

	* 观察处于无效状态的对象；

	* 违反类的任何变量、前置条件或后置条件。

* 而且，要成为线程安全的类，在从多个线程访问时，它必须继续正确运行，而不管运行时环境执行那些线程的调度和交叉，且无需对部分调用代码执行任何其他同步。

* 如果没有线程之间的某种明确协调，比如锁定，运行时可以随意在需要时在多线程中交叉操作执行。

* 在并发编程中，一种被普遍认可的原则就是：尽可能的使用**不可变对象**来创建简单、可靠的代码。

# Thread

* 任何一个时刻，对象的控制权（monitor）只能被一个线程拥有。

* 无论是执行对象的`wait`、`notify`还是`notifyAll`方法，必须保证当前运行的线程取得了该对象的控制权（monitor）。

* 如果在没有控制权的线程里执行对象的以上三种方法，就会报java.lang.IllegalMonitorStateException异常。

* JVM基于多线程，默认情况下不能保证运行时线程的时序性。


## interrupt

* 当调用`th.interrput()`的时候，线程th的中断状态(interrupted status) 会被置位。我们可以通过Thread.currentThread().isInterrupted() 来检查这个布尔型的中断状态。

* **没有任何语言方面的需求要求一个被中断的程序应该终止**。中断一个线程只是为了引起该线程的注意，被中断线程可以决定如何应对中断。这说明interrupt中断的是线程的某一部分业务逻辑，前提是线程需要检查自己的中断状态(isInterrupted())。

* 当th被阻塞的时候，比如被`Object.wait`, `Thread.join`和`Thread.sleep`三种方法之一阻塞时, 调用它的interrput()方法，可想而知，没有占用CPU运行的线程是不可能给自己的中断状态置位的, 这就会产生一个InterruptedException异常。

## join

* join方法可以让一个线程**等待**另一个线程执行完成。

* 若t是一个正在执行的Thread对象，t.join() 将会使当前线程暂停执行并等待t执行完成。重载的join()方法可以让开发者自定义等待周期。然而，和sleep()方法一样join()方法依赖于操作系统的时间处理机制，你不能假定join()方法将会精确的等待你所定义的时长。

* 如同sleep()方法，join()方法响应中断并在中断时抛出InterruptedException。

## 同步

* 同步的构造方法没有意义，因为当这个对象被创建的时候，只有创建对象的线程能访问它。

* 静态方法是和类（而不是对象）相关的，所以线程会请求类对象(Class Object)的内部锁。因此用来控制类的**静态域**访问的锁不同于控制**对象**访问的锁。

* 如果类中的两个域需要同步访问，但是两个域没有什么关联，那么可以为两个域个创建一个私有的锁对象，使两个域能分别同步。

## 锁

* 死锁描述了这样一种情景，两个或多个线程永久阻塞，互相等待对方释放资源。

* 饥饿是指当一个线程不能正常的访问共享资源并且不能正常执行的情况。这通常在共享资源被其他“贪心”的线程长期占用时发生

* 一个线程通常会有会响应其他线程的活动。如果其他线程也会响应另一个线程的活动，那么就有可能发生活锁。同死锁一样，发生活锁的线程无法继续执行, 然而线程并没有阻塞, 他们在忙于响应对方无法恢复工作。

* wait方法，释放锁并挂起

* 如果在一个执行序列中，需要确定对象的状态，那么某个线程在执行这个序列时，需要获得所有这些对象的锁（如一来一回的相互鞠躬，必须保证不会同时鞠躬也不会同时静止）


# 线程安全集合

* java.util.concurrent 包添加了多个新的线程安全集合类 `ConcurrentHashMap`, `CopyOnWriteArrayList`, `CopyOnWriteArraySet`

* JDK 5.0 还提供了两个新集合接口 -- `Queue` 和 `BlockingQueue`。Queue 接口与 List 类似，但它只允许从后面插入，从前面删除。BlockingQueue定义了一个先进先出的数据结构，当你尝试往满队列中添加元素，或者从空队列中获取元素时，将会阻塞或者超时。

* `ConcurrentMap`是java.util.Map的子接口，定义了一些有用的原子操作。移除或者替换键值对的操作只有当key存在时才能进行，而新增操作只有当key不存在时才能进行, 使这些操作原子化，可以避免同步。ConcurrentMap的标准实现是`ConcurrentHashMap`，它是`HashMap`的并发模式。

* `ConcurrentNavigableMap`是ConcurrentMap的子接口，支持近似匹配。ConcurrentNavigableMap的标准实现是`ConcurrentSkipListMap`，它是`TreeMap`的并发模式。

* 所有这些集合，通过 在集合里新增对象和访问或移除对象的操作之间，定义一个`happens-before`的关系，来帮助程序员避免内存一致性错误。

## CopyOnWrite

* Vector 的常见应用是存储通过组件注册的监听器的列表。当发生适合的事件时，该组件将在监听器的列表中迭代，调用每个监听器。为了防止ConcurrentModificationException，迭代线程必须复制列表或锁定列表，以便进行整体迭代，而这两种情况都需要大量的性能成本。

* CopyOnWriteArrayList及CopyOnWriteArraySet 类通过每次添加或删除元素时创建数组的新副本，避免了这个问题，但是进行中的迭代保持对创建迭代器时的副本进行操作。虽然复制也会有一些成本，但是在许多情况下，迭代要比修改多得多，在这些情况下，写入时复制要比其他备用方法具有更好的性能和并发性。

## ConcurrentHashMap

* `Hashtable` 和 `synchronizedMap` 所采取的获得同步的简单方法（同步 Hashtable 或者同步 Map 封装器对象中的每个方法）有两个主要的不足：

	* 第一，这种方法对于可伸缩性是一种障碍，因为一次只能有一个线程可以访问 hash 表；

	* 第二，这样仍不足以提供真正的线程安全性，许多公用的混合操作仍然需要额外的同步。虽然诸如 get() 和 put() 之类的简单操作可以在不需要额外同步的情况下安全地完成，但还是有一些公用的操作序列，例如迭代或者 put-if-absent（空则放入），需要外部的同步，以避免数据争用。

* 在大多数情况下，`ConcurrentHashMap` 是 Hashtable或 Collections.synchronizedMap(new HashMap()) 的简单替换。然而，其中有一个显著不同，即 ConcurrentHashMap 实例中的同步**不锁定**Map进行独占使用, 实际上，没有办法锁定 ConcurrentHashMap 进行独占使用，它被设计用于进行并发访问。为了使集合不被锁定进行独占使用，还提供了公用的混合操作的其他（原子）方法，如 **put-if-absent**。

* ConcurrentHashMap 返回的迭代器是弱一致的，意味着它们将不抛出ConcurrentModificationException ，将进行 "合理操作" 来反映迭代过程中其他线程对 Map 的修改。

## 队列

* `Queue` 接口比 List 简单得多，仅包含 put() 和 take() 方法，并允许比 LinkedList 更有效的实现。

* Queue 接口还允许实现来确定存储元素的顺序。`ConcurrentLinkedQueue` 类实现先进先出（first-in-first-out，FIFO）队列。`PriorityQueue` 类实现优先级队列（也称为堆），它对于构建调度器非常有用，调度器必须按优先级或预期的执行时间执行任务。

* 实现 Queue 的类是：

	* `LinkedList` 已经进行了改进来实现 Queue。

    * `PriorityQueue` 非线程安全的优先级队列（堆）实现，根据自然顺序或比较器返回元素。

    *  `ConcurrentLinkedQueue` 快速、线程安全的、无阻塞 FIFO 队列。

## 弱一致的迭代器

* java.util 包中的集合类都返回 `fail-fast` 迭代器，这意味着它们假设线程在集合内容中进行迭代时，集合不会更改它的内容。如果 fail-fast 迭代器检测到在迭代过程中进行了更改操作，那么它会抛出 **ConcurrentModificationException**，这是不可控异常。

* java.util.concurrent 集合返回的迭代器称为弱一致的（`weakly consistent`）迭代器。对于这些类，如果元素自从迭代开始已经删除，且尚未由 next() 方法返回，那么它将不返回到调用者。如果元素自迭代开始已经添加，那么它可能返回调用者，也可能不返回。在一次迭代中，无论如何更改底层集合，元素不会被返回两次。



# 线程池

* 管理一大组小任务的标准机制是**组合工作队列**和**线程池**。工作队列就是要处理的任务的队列，前面描述的 Queue 类完全适合。线程池是线程的集合，每个线程都提取公用工作队列。当一个工作线程完成任务处理后，它会返回队列，查看是否有其他任务需要处理。如果有，它会转移到下一个任务，并开始处理。

* 线程池为线程生命周期间接成本问题和资源崩溃问题提供了解决方案。
    * 通过对多个任务重新使用线程，创建线程的间接成本将分布到多个任务中。
    * 作为一种额外好处，因为请求到达时，线程已经存在，从而可以消除由创建线程引起的延迟, 因此，可以立即处理请求，使应用程序更易响应。
    * 而且，通过正确调整线程池中的线程数，可以强制超出特定限制的任何请求等待，直到有线程可以处理它，它们等待时所消耗的资源要少于使用额外线程所消耗的资源，这样可以防止资源崩溃。

# Executor 框架

* `Executor` 接口关注任务提交，确定执行策略。这使在部署时调整执行策略（队列限制、池大小、优先级排列等等）更加容易，更改的代码最少。

* 大多数 Executor 实现类还实现 `ExecutorService`接口，ExecutorService是Executor的子接口，它还管理执行服务的生命周期。这使它们更易于管理，并向生命可能比单独 Executor 的生命更长的应用程序提供服务。

* **执行策略**定义何时在哪个线程中运行任务，执行任务可能消耗的资源级别（线程、内存等等），以及如果执行程序超载该怎么办。

## ExecutorService

* `ExecutorService`接口在提供了execute方法的同时，新加了更加通用的`submit`方法。

* 通过submit方法返回的`Future`对象可以读取`Callable`任务的执行结果，或管理Callable任务和Runnable任务的状态。

* ExecutorService也提供了批量运行Callable任务的方法，ExecutorService还提供了一些关闭执行器的方法。

## ScheduledExecutorService

* `ScheduledExecutorService`扩展ExecutorService接口并添加了`schedule`方法。调用schedule方法可以在指定的延时后执行一个Runnable或者Callable任务。

* ScheduledExecutorService接口还定义了按照指定时间间隔定期执行任务的`scheduleAtFixedRate`方法和`scheduleWithFixedDelay`方法。

## Executors

`Executors类`包含用于构造许多不同类型的 Executor 实现的静态工厂方法：

* `newCachedThreadPool()` 创建不限制大小的线程池，但是当以前创建的线程可以使用时将重新使用那些线程。如果没有现有线程可用，将创建新的线程并将其添加到池中。已有 60 秒钟未被使用的线程将其终止并从缓存中删除。

* `newFixedThreadPool(int n)` 创建一个可重用固定线程数的线程池，以共享的无界队列方式来运行这些线程。如果在所有线程处于活动状态时提交附加任务，则在有可用线程之前，附加任务将在队列中等待。如果在关闭前的执行期间由于失败而导致任何线程终止，那么一个新线程将代替它执行后续的任务。

* `newSingleThreadExecutor()` 创建一个单线程的线程池。这个线程池只有一个线程在工作，也就是相当于单线程串行执行所有任务, 此线程池保证所有任务的执行顺序按照任务的提交顺序执行。如果这个唯一的线程因为异常结束，那么会有一个新的线程来替代它。

* `newScheduledThreadPool(int n)`  创建一个大小无限的线程池, 此线程池支持定时以及周期性执行任务的需求。

* 如果上面的方法都不满足需要，可以尝试`ThreadPoolExecutor`或者`ScheduledThreadPoolExecutor`。

## 定制 ThreadPoolExecutor

通过使用包含 `ThreadFactory` 变量的工厂方法或构造函数的版本，可以定义线程的创建。ThreadFactory 是工厂对象，其构造执行程序要使用的新线程。

```java
public class DaemonThreadFactory implements ThreadFactory {
    public Thread newThread(Runnable r) {
        Thread thread = new Thread(r);
        thread.setDaemon(true);
        return thread;
    }
}
```

有时，Executor 不能执行任务，因为它已经关闭或者因为 Executor 使用受限制队列存储等待任务，而该队列已满。在这种情况下，需要咨询执行程序的`RejectedExecutionHandler` 来确定如何处理任务：

* 抛出异常（默认情况），

* 放弃任务，

* 在调用者的线程中执行任务，

* 或放弃队列中最早的任务以为新任务腾出空间。

* `setRejectedExecutionHandler`可以设置拒绝的执行处理程序。


## 需要特别考虑的问题

如果应用程序对特定执行程序进行了假设，那么应该在 Executor 定义和初始化的附近对这些进行说明，从而使善意的更改不会破坏应用程序的正确功能。

* 一些任务可能同时等待其他任务完成。在这种情况下，当线程池没有足够的线程时，如果所有当前执行的任务都在等待另一项任务，而该任务因为线程池已满不能执行，那么线程池可能会死锁。

* 一组线程必须作为共同操作组一起工作。在这种情况下，需要确保线程池能够容纳所有线程。

## 调整线程池

* 如果线程池太小，资源可能不能被充分利用，在一些任务还在工作队列中等待执行时，可能会有处理器处于闲置状态。

* 另一方面，如果线程池太大，则将有许多有效线程，因为大量有效线程使用内存，或者因为每项任务要比使用少量线程有更多上下文切换，性能可能会受损。

* Amdahl 法则提供很好的近似公式来确定线程池的大小：

>用 `WT` 表示每项任务的平均等待时间，`ST` 表示每项任务的平均服务时间（计算时间）。则 `WT/ST` 是每项任务等待所用时间的百分比。对于 N 处理器系统，池中可以近似有 `N*(1+WT/ST)` 个线程。

## Future 接口

* `Future` 接口允许表示已经完成的任务、正在执行过程中的任务或者尚未开始执行的任务。通过 Future 接口，可以尝试取消尚未完成的任务，查询任务已经完成还是取消了，以及提取（或等待）任务的结果值。

* `FutureTask` 类实现了 Future，并包含一些构造函数，允许将 Runnable 或 Callable和 Future 接口封装。因为 FutureTask 也实现 Runnable，所以可以只将 FutureTask 提供给 Executor。一些提交方法（如 `ExecutorService.submit()`）除了提交任务之外，还将返回 Future 接口。

* `Future.get()` 方法检索任务计算的结果, 如果任务尚未完成，那么 Future.get() 将被阻塞直到任务完成；如果任务已经完成，那么它将立即返回结果; 如果任务完成，但有异常，则抛出 ExecutionException。

## 使用 Future 构建缓存

该示例利用 ConcurrentHashMap 中的原子 `putIfAbsent()` 方法，确保仅有一个线程试图计算给定关键字的值。如果其他线程随后请求同一关键字的值，它仅能等待（通过 Future.get() 的帮助）第一个线程完成。因此两个线程不会计算相同的值。

```java
public class Cache<K,V> {
    private ConcurrentMap<K,FutureTask<V>> map = new ConcurrentHashMap<>();
    private Executor executor = Executors.newFixedThreadPool(8);

    static class Task<V> implements Callable<V>{
        @Override
        public V call() throws Exception {
            return null;
        }
    }

    public V get(final K key) throws ExecutionException, InterruptedException {
        FutureTask<V> ft = map.get(key);
        if (ft == null) {
            ft = new FutureTask(new Task());
            FutureTask<V> old = map.putIfAbsent(key, ft);
            if (old == null){
                executor.execute(ft);
            }else{
                ft = old;
            }
        }
        return ft.get();
    }
}
```

## CompletionService

* `CompletionService` 将执行服务与类似 Queue 的接口组合，从任务执行中删除任务结果的处理。CompletionService 接口包含用来提交将要执行的任务的 submit() 方法和用来询问下一完成任务的 `take()`/`poll()` 方法。

* CompletionService 允许应用程序结构化，使用 `Producer`/`Consumer` 模式，其中生产者创建任务并提交，消费者请求完成任务的结果并处理这些结果。CompletionService 接口由 `ExecutorCompletionService` 类实现，该类使用 Executor 处理任务并从 CompletionService 导出 `submit`/`poll`/`take` 方法。

* 下列代码使用 Executor 和 CompletionService 来启动许多任务，并使用第一个生成的非空结果，然后取消其余任务：

```java
<V> V solve(Executor e, Collection<Callable<V>> tasks) throws InterruptedException, ExecutionException {
    CompletionService<V> ecs = new ExecutorCompletionService<>(e);
    List<Future<V>> futures = new ArrayList<>();
    V result = null;

    try {
        tasks.forEach(p -> futures.add(ecs.submit(p)));
        for (int i = 0; i < tasks.size(); ++i) {
            V r = ecs.take().get();
            if (r != null) {
                result = r;
                break;
            }
        }
    } finally {
        for (Future<V> f : futures){
            f.cancel(true);
        }
    }

    return result;
}
```

## Fork/Join

* `fork/join`框架是ExecutorService接口的一种具体实现，目的是为了更好地利用多处理器带来的好处。它是为那些能够被递归地拆解成子任务的工作类型量身设计的。其目的在于能够使用所有可用的运算能力来提升你的应用的性能。

* 类似于ExecutorService接口的其他实现，fork/join框架会将任务分发给线程池中的工作线程。fork/join框架的独特之处在与它使用工作窃取(`work-stealing`)算法。完成自己的工作而处于空闲的工作线程能够从其他仍然处于忙碌(busy)状态的工作线程处窃取等待执行的任务。

* fork/join框架的核心是`ForkJoinPool`类，它是对`AbstractExecutorService`类的扩展。ForkJoinPool实现了工作偷取算法，并可以执行ForkJoinTask任务。

* 在Java SE 8中，java.util.`Arrays`类的一系列`parallelSort()`方法就使用了fork/join来实现。这些方法与sort()系列方法很类似，但是通过使用fork/join框架，借助了并发来完成相关工作, 在多处理器系统中，对大数组的并行排序会比串行排序更快。

* 其他采用了fork/join框架的方法还有java.util.`streams`包中的一些方法，此包是Java SE 8发行版中Project Lambda的一部分。

# 同步工具

## Semaphore

* `Semaphore` 类实现标准 Dijkstra 计数信号。计数信号可以认为具有一定数量的许可权，该许可权可以获得或释放。如果有剩余的许可权，`acquire()` 方法将成功，否则该方法将被阻塞，直到其他线程释放`release()`许可权, 线程一次可以获得多个许可权。

* 计数信号可以用于限制有权对资源进行并发访问的线程数。该方法对于实现资源池或限制 Web 爬虫（Web crawler）中的输出 socket 连接非常有用。

* 注意信号不跟踪哪个线程拥有多少许可权, 这由应用程序来决定，以确保何时线程释放许可权，该信号表示其他线程拥有许可权或者正在释放许可权，以及其他线程知道它的许可权已释放。

## 互斥

* 计数信号的一种特殊情况是**互斥**，或者互斥信号。互斥就是具有单一许可权的计数信号，意味着在给定时间仅一个线程可以具有许可权, 互斥可以用于管理对共享资源的独占访问。

* 虽然互斥许多地方与锁定一样，但互斥还有一个锁定通常没有的功能，就是互斥可以由不具有许可权的其他线程来释放, 这在死锁恢复时会非常有用。

## CyclicBarrier

* `CyclicBarrier` 类可以帮助同步，它允许一组线程等待整个线程组到达公共屏障点。CyclicBarrier 是使用整型变量构造的，其确定组中的线程数。当一个线程到达屏障时（通过调用 CyclicBarrier.`await()`），它会被阻塞，直到所有线程都到达屏障，然后在该点允许所有线程继续执行。

* CyclicBarrier可以重新使用, 一旦所有线程都已经在屏障处集合并释放，则可以将该屏障重新初始化到它的初始状态。 还可以指定在屏障处等待时的超时；如果在该时间内其余线程还没有到达屏障，则认为屏障被打破，所有正在等待的线程会收到 `BrokenBarrierException`。

* 下列代码将创建 CyclicBarrier 并启动一组线程，每个线程在到达屏障点前会打印出自己的名字，等待其他线程到齐后，将执行CyclicBarrier绑定的Runnable，该Runnable在每个屏障点只执行一次。

```java
    public static void main(String[] args){
        Runnable ready = new Runnable() {
            @Override
            public void run() {
                System.out.println("ready");
            }
        };

        CyclicBarrier cyclicBarrier = new CyclicBarrier(5, ready);

        ExecutorService executor = Executors.newCachedThreadPool();
        for (int i = 0; i < 5; i++) {
            Runnable task = new Runnable() {
                @Override
                public void run() {
                    try {
                        System.out.println(Thread.currentThread().getName());
                        cyclicBarrier.await();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (BrokenBarrierException e) {
                        e.printStackTrace();
                    }
                }
            };
            executor.submit(task);
        }
        executor.shutdown();
    }
```

## CountdownLatch

* `CountdownLatch` 类与 CyclicBarrier 相似，因为它的角色是对已经在它们中间分摊了问题的一组线程进行协调。它也是使用整型变量构造的，指明计数的初始值，但是与 CyclicBarrier 不同的是，CountdownLatch 不能重新使用。

* 其中，CyclicBarrier 是到达屏障的所有线程的大门，只有当所有线程都已经到达屏障或屏障被打破时，才允许这些线程通过。CountdownLatch 将到达和等待功能分离，任何线程都可以通过调用 `countDown()` 减少当前计数，这种方式不会阻塞线程，而只是减少计数。`await()` 方法的行为与 CyclicBarrier.await() 稍微有所不同，调用 await() 任何线程都会被阻塞，直到闩锁计数减少为零，在该点等待的所有线程才被释放，对 await() 的后续调用将立即返回。

*  当问题已经分解为许多部分，每个线程都被分配一部分计算时，CountdownLatch 非常有用。在工作线程结束时，它们将减少计数，协调线程可以在闩锁处等待当前这一批计算结束，然后继续移至下一批计算。

```java
public static void main(String[] args) throws InterruptedException {
    int concurrency = 5;
    ExecutorService executor = Executors.newCachedThreadPool();

    final CountDownLatch ready = new CountDownLatch(concurrency);
    final CountDownLatch start = new CountDownLatch(1);
    final CountDownLatch done = new CountDownLatch(concurrency);
    for(int i=0; i<concurrency; i++){
        executor.execute(new Runnable(){
            public void run(){
                ready.countDown();
                try {
                    start.await();
                    System.out.println(Thread.currentThread().getName() + "----done");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                done.countDown();
            }
        });
    }
    ready.await();
    System.out.println("all threads are ready");
    start.countDown();
    done.await();
    System.out.println("all threads finished");
    executor.shutdown();
}
```

## Exchanger

* `Exchanger` 类方便了两个共同操作线程之间的双向交换，就像具有计数为 2 的 CyclicBarrier，并且两个线程在都到达屏障时可以"交换"一些状态。（Exchanger 模式有时也称为聚集。）

* Exchanger 通常用于一个线程填充缓冲（通过读取 socket），而另一个线程清空缓冲（通过处理从 socket 收到的命令）的情况。当两个线程在屏障处集合时，它们交换缓冲。

* 下列代码说明了这项技术：

```java
public static void main(String[] args){
    Exchanger<String> exchanger = new Exchanger<>();
    ExecutorService executor = Executors.newCachedThreadPool();

    Runnable producer = new Runnable() {
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                try {
                    String data = "produce";
                    System.out.println(Thread.currentThread().getName() + "-offer----" + data);
                    exchanger.exchange(data);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    Runnable consumer = new Runnable() {
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                try {
                    String data = exchanger.exchange(null);
                    System.out.println(Thread.currentThread().getName() + "-get----" + data);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        }
    };

    executor.execute(producer);
    executor.execute(consumer);
    executor.shutdown();
}
```

# Lock工具

* `Lock` 接口将内置监视器锁定的行为普遍化，允许多个锁定实现，同时提供一些内置锁定缺少的功能，如**计时**的等待、**可中断**的等待、锁定**轮询**、每个锁定有多个**条件**等待集合以及**无阻塞**结构的锁定。

* java.util.concurrent.`locks`包提供了复杂的锁, 锁对象作用非常类似同步代码使用的隐式锁, 每次只有一个线程可以获得锁对象。通过关联`Condition`对象，锁对象也支持`wait/notify`机制。

* 锁对象之于隐式锁最大的优势在于，它们**有能力收回获取锁的尝试**（如果获取锁失败，将不会继续请求，以免发生死锁）。如果当前锁对象不可用，或者锁请求超时（如果超时时间已指定），`tryLock`方法会收回获取锁的请求。如果在锁获取前，另一个线程发送了一个中断，`lockInterruptibly`方法也会收回获取锁的请求。


## ReentrantLock

* `ReentrantLock` 是具有与隐式监视器锁定（使用 synchronized 方法和语句访问）相同的基本行为和语义的 Lock 的实现，但它具有扩展的能力。

* 在竞争条件下，ReentrantLock 的实现要比现在的 synchronized 实现更具有可伸缩性。这意味着当许多线程都竞争相同锁定时，使用 ReentrantLock 的吞吐量通常要比 synchronized 好。

* 虽然 ReentrantLock 类有许多优点，但是与同步相比，它有一个主要**缺点** -- 它可能忘记释放锁定。因为锁定失误（忘记释放锁定）的风险，所以对于基本锁定，强烈建议继续使用 synchronized，除非真的需要 ReentrantLock 额外的灵活性和可伸缩性。

* 建议当获得和释放 ReentrantLock 时使用下列结构：

```java
Lock lock = new ReentrantLock();
...
lock.lock();
try {
  // perform operations protected by lock
}
catch(Exception ex) {
 // restore invariants
}
finally {
  lock.unlock();
}
```



## Condition

* 就像 Lock 接口是同步的具体化，`Condition` 接口是 Object 中 wait() 和 notify() 方法的具体化。Lock 中的一个方法是 `newCondition()`，它要求该锁定返回新的 Condition 对象限制。

* `await()`、`signal()` 和 `signalAll()` 方法类似于 wait()、notify() 和 notifyAll()，但增加了灵活性，每个 Lock 都可以创建多个条件变量。这简化了一些并发算法的实现。

## ReadWriteLock

* ReentrantLock 实现的锁定规则非常简单 -- 每当一个线程具有锁定时，其他线程必须等待，直到该锁定可用。

* 有时，当对数据结构的读取通常多于修改时，可以使用更复杂的称为读写锁定的锁定结构，它允许有多个并发读者，同时还允许一个写入者独占锁定。该方法在一般情况下（只读）提供了更大的并发性，同时在必要时仍提供独占访问的安全性。

* `ReadWriteLock` 接口和 `ReentrantReadWriteLock` 类提供这种功能 -- **多读者**、**单写入**者锁定规则，可以用这种功能来保护共享的易变资源。

# 原子变量

* java.util.concurrent.`atomic`包定义了对单一变量进行原子操作的类。所有的类都提供了`get`和`set`方法，可以使用它们像读写`volatile`变量一样读写原子类。就是说，同一变量上的一个set操作对于任意后续的get操作存在happens-before关系。原子的`compareAndSet`方法也有内存一致性特点，就像应用到整型原子变量中的简单原子算法。

* 即使大多数用户将很少直接使用它们，原子变量类（`AtomicInteger`、`AtomicLong`、`AtomicReference` 等等）也有充分理由是最显著的新并发类。这些类公开对 JVM 的低级别改进，允许进行具有高度可伸缩性的**原子读-修改-写操作**。大多数现代 CPU 都有原子读-修改-写的原语，比如比较并交换（CAS）或加载链接/条件存储（LL/SC）。原子变量类使用硬件提供的最快的并发结构来实现。

* 几乎 java.util.concurrent 中的所有类都是在 `ReentrantLock` 之上构建的，ReentrantLock 则是在**原子变量类**的基础上构建的。所以，虽然仅少数并发专家使用原子变量类，但 java.util.concurrent 类的很多可伸缩性改进都是由它们提供的。

* 原子变量主要用于为原子地更新 "热" 字段提供有效的、细粒度的方式， "热" 字段是指由多个线程频繁访问和更新的字段。另外，原子变量还是计数器或生成序号的自然机制。

# 并发随机数

* 在JDK7中，java.util.concurrent包含了一个相当便利的类，`ThreadLocalRandom`，当应用程序期望在多个线程或ForkJoinTasks中使用随机数时。

* 对于并发访问，使用TheadLocalRandom代替Math.random()可以减少竞争，从而获得更好的性能。

* 只需调用ThreadLocalRandom.`current()`， 然后调用它的其中一个方法去获取一个随机数即可。

# 性能与可伸缩性

* **性能**是 "可以快速执行此任务的程度" 的评测。**可伸缩性**描述应用程序的**吞吐量如何表现为它的工作量和可用计算资源增加**。

* 可伸缩的程序可以按比例使用更多的处理器、内存或 I/O 带宽来处理更多个工作量。当我们在并发环境中谈论可伸缩性时，我们是在问当许多线程同时访问给定类时，这个类的执行情况。

* java.util.concurrent 中的低级别类 ReentrantLock 和原子变量类的可伸缩性要比内置监视器（同步）锁定高得多。因此，使用 ReentrantLock 或原子变量类来协调共享访问的类也可能更具有可伸缩性。

