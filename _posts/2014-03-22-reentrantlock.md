---
layout: post
title: 可重入锁
tags: Java Concurrent Lock
categories: Java
---

Java 中的锁是可重入的，当线程试图获得它自己占有的锁时，请求会成功。

这样使用`synchronized`并不会造成死锁

~~~java
public synchronized void test(){
    //do something
    synchronized(this) {
        //do something
        synchronized (this){
            //do something
            synchronized (this){
                //do something
            }
        }
    }
}
~~~

这是因为java线程是基于 “每线程（per-thread）”，而不是基于“每调用的（per-invocation）” 的，也就是说java为每个线程分配一个锁，而不是为每次调用分配一个锁。

重入的实现是通过为每个锁关联一个请求计数和一个占有它的线程。当请求计数器为0时，这个锁可以被认为是未占用的，当一个线程请求一个未占用的锁时，JVM记录锁的拥有者，并把锁的请求计数加1，如果同一个线程再次请求这个锁时，请求计数器就会增加，当该线程退出`syncronized`块时，计数器减1，当计数器为0时，锁被释放。