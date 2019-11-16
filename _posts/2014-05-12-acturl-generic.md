---
layout: post
title: 超类中的泛型
tags: generic type Java
categories: java
published: false
---

为了减少工作量，开发者往往喜欢将相同的特性放入超类，通过继承实现代码共享

例如web项目中常见的`BaseDao<T>`，并使用泛型对参数与返回值类型进行约束

某些情况下，我们可能需要获得真实的类型参数，也就是`T`的真实类型

首先，沿着继承链向上追溯，找到传入类型参数的位置，并获取存储类型参数的对象

~~~java
    private static ParameterizedType getParameterizedType(Class<?> clazz){
        Type st = clazz.getGenericSuperclass();
        if(st == null){
            return null;
        }
        if(st instanceof ParameterizedType){
            ParameterizedType pt = (ParameterizedType)st;
            return pt;
        } else{
            return getParameterizedType(clazz.getSuperclass());
        }
    }
~~~

类的参数数量是不定的，如 `Map<K,V>` 定义了两个，`List<T>` 只定义了一个，所以类型参数是个列表，获取真实类型时需要指定要取哪一个

~~~java
    private static Class<?> getClass(ParameterizedType pt, int index){
        Type param = pt.getActualTypeArguments()[index];
        if(param instanceof Class){
            return (Class<?>)param;
        } else {
            return null;
        }
    }
~~~

通常情况下，到这里已经可以取到真实类型了，但是上面的代码忽略了一些不正常情况

**情况一：**

超类定义了多个参数，而子类中是分批传参的，此时从继承链上最近的位置获得的参数列表是不全的

~~~java
class Generic<K,V>{}
class SubGeneric<V> extends Generic<String,V>{}
class Acturl extends SubGeneric<String>{}
~~~

**情况二：**

在继承链中的某个位置传入了类型参数，然后又定义了一个新的参数，此时从继承链上最近的位置获取的参数列表和顶层类的参数已经没有关系了

~~~ java
class Generic<K>{}
class SubGeneric<S> extends Generic<String>{}
class Acturl extends SubGeneric<Integer>{}
~~~

**情况三：**

这是情况一与情况二的混合版，而且参数`V`的位置都变了

~~~ java
class Generic<K,V>{}
class SubGeneric<V,S> extends Generic<String,V>{}
class Acturl extends SubGeneric<Integer,String>{}
~~~


这些问题有空再研究

~~~java
//TODO
~~~