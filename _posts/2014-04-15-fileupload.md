---
layout: post
title: Custom Fileupload
tags: fileupload Java Http
categories: web
published: true
---

* TOC 
{:toc}

本文的目的是简要说明如何编写一个文件上传组件，使他的功能类似 [commons-fileupload][commons-fileupload], 并在结尾处提供了完整代码的获取方式。

# HTTP
本文讨论的是基于 HTTP 协议的文件上传，下面先来看看 HTTP 请求的真面目。

首先，用 JavaSe 类库中的 Socket 搭建一个超简单的服务器，这个服务器只有一个功能，就是完整地打印整个 HTTP 请求体。

~~~java
public class Server {

    private ServerSocket serverSocket;

    public Server() throws  IOException{
        serverSocket = new ServerSocket(8080);
    }

    public void show() throws IOException{
        while(true){
            Socket socket = serverSocket.accept();
            byte[] buf = new byte[1024];
            InputStream is =  socket.getInputStream();
            OutputStream os = new ByteArrayOutputStream();
            int n = 0;
            while ((n = is.read(buf)) > -1){
                os.write(buf,0,n);
            }
            os.close();
            is.close();
            socket.close();

            System.out.println(os);
        }
    }

    public static void main(String[] args) throws IOException {
        new Server().show();
    }

}
~~~

将服务器运行起来之后，在浏览器中输入地址：`http://localhost:8080`

在我的机器上，显示如下内容，可以看到，这个一个get请求

![http-get][http-get]

下面利用一个 html 的 form表单提交 post 请求

~~~html
    <form action="http://localhost:8080" method="post" enctype="multipart/form-data">
       <input type="text" name="time" value="1970-01-01"/>
        <input type="file" name="file"/>
        <input type="submit"/>
    </form>
~~~

在我的机器上，显示如下内容

![http-post][http-post]

注意图中被红色框起来的部分，第一个红框指示了本次请求中，用来分隔不同元素的分隔线。

每个元素将以此分隔线作为第一行，后面紧跟对元素的描述，描述与内容用空行分隔。

分隔线的后面加两个小短横代表整个请求体结束，即**EOF**。

我们需要做的工作，就是利用分隔线，从请求体中分离出每个元素，分析HTTP请求头的工作可以交给Servlet。

# 分析

那么，如何分离呢？

java中的 `InputStream` 只能读取一次，所以我们想要方便地分析一个流，最直接的办法就是将其缓存下来。

RandomAccessFile 或许能够满足需求，RandomAccessFile 可以提供一个指针用于在文件中的随意移动，然而需要读写本地文件的方案不会是最优方案。

先将整个流读一遍将内容缓存到内存中？ 这种方案在多个客户端同时提交大文件时一定是不可靠的。

最理想的方案可能是，我只需要读一遍 `InputStream` , 读完后将得到一个有序列表，列表中存放每个元素对象。

很明显，JavaSe的流没有提供这个功能

我们知道从 `InputStreeam` 中获取内容需要使用 `read` 方法，返回 `-1` 表示读到了流的末尾，如果我们增强一下`read`的功能，让其在读到每个元素末尾的时候返回 `-1`，这样不就可以分离出每个元素了吗，至于判断是否到了整个流的末尾，自有办法。


# 设计

如何增强`read`方法呢？

`read`方法要在读到元素末尾时返回`-1` , 一定需要先对已读取的内容进行分析，判断是否元素末尾。

我的做法是，内部维护一个buffer，`read`方法在读取时先将字节写入到这个buffer中，然后分析其中是否存在分隔线，然后将buffer中可用的元素复制到客户端提供的buffer。

这个内部维护的buffer并不总是满的，其中的字节来自read方法的原始功能，所以我们需要一个变量来记录buffer中有效字节的末尾位置 `tail`。

我们还需要一个变量 `pos` 来标记buffer中是否存在分隔线，pos的值即为分隔线的开头在buffer中的位置，如果buffer中不存在分隔线pos的值将为-1。

但是问题没这个简单，分隔线在buffer中存在状态有两种情况：

情况A，分隔线完好地存在于buffer中，图中的bundary即为分隔线

![boundary-A][boundary-A]

情况B，分隔线的一部分存在于buffer中

![boundary-B][boundary-B]

在B情况下，`boundary`有多少字节存在于buffer中是不确定的，而且依靠这些不完整的字节根本无法判断他是否属于boundary开头。

例如，buffer中没有发现boundary，但是buffer末尾的3个字节与boundary开头相同，这种情况可能只是巧合，boundary并没有被截断。

对于这个问题，有一个解决办法，我们不必检查到buffer末尾，而是在buffer末尾留一个关健区`pad`。

这个关健区中很有可能存在被截断boundary，每次检查到`pad`开头时立即收手，此位置之前的数据可以确保没有boundary，在下次填充buffer时，将这个关健区中的数据复制到buffer开头再处理。很显然，关健区`pad`长度应该等于boundary，如图：

![pad][pad]

# 关键代码

**在buffer中检查boundary**

~~~java
private int findSeparator() {
    int first;
    int match = 0;
    //若buffer中head至tail之间的字节数小于boundaryLength,那么maxpos将小于head,循环将不会运行,返回值为-1
    int maxpos = tail - boundaryLength;
    for (first = head; first <= maxpos && match != boundaryLength; first++) {
        first = findByte(boundary[0], first);
        if (first == -1 || first > maxpos) {
            return -1;
        }
        for (match = 1; match < boundaryLength; match++) {
            if (buffer[first + match] != boundary[match]) {
                break;
            }
        }
    }
    if (match == boundaryLength) {
        return first - 1;
    }
    return -1;
}
~~~


**填充buffer**

~~~java
private int makeAvailable() throws IOException {
    //该方法在available返回0时才会被调用,若pos!=-1那pos==head,表示boundary处于head位,可用字节数为0
    if (pos != -1) {
        return 0;
    }

    // 将pad位之后的数据移动到buffer开头
    total += tail - head - pad;
    System.arraycopy(buffer, tail - pad, buffer, 0, pad);

    // 将buffer填满
    head = 0;
    tail = pad;
    //循环读取数据,直至将buffer填满,在此过程中,每次读取都将检索buffer中是否存在boundary,无论存在与否,都将即时返回可用数据量
    for (;;) {
        int bytesRead = input.read(buffer, tail, bufSize - tail);
        if (bytesRead == -1) {
            //理论上因为会对buffer不断进行检索,读到boundary时就会return 0,read方法将返回 -1,
            //所以不会读到input末尾,如果运行到了这里,表示发生了错误.
            final String msg = "Stream ended unexpectedly";
            throw new RuntimeException(msg);
        }
        if (notifier != null) {
            notifier.noteBytesRead(bytesRead);
        }
        tail += bytesRead;
        findSeparator();
        //若buffer中的数据量小于keepRegion(boundaryLength),av将必定等于0,循环将继续,直至数据量大于或等于keepRegion(boundaryLength).
        //此时将检索buffer中是否包含boundary,若包含,将返回boundary所在位置pos之前的数据量,若不包含,将返回pad位之前的数据量
        int av = available();

        if (av > 0 || pos != -1) {
            return av;
        }
    }
}
~~~

**强化后的read方法**

~~~java
@Override
public int read(byte[] b, int off, int len) throws IOException {
    if (closed) {
        throw new RuntimeException("the stream is closed");
    }
    if (len == 0) {
        return 0;
    }
    int res = available();
    if (res == 0) {
        res = makeAvailable();
        if (res == 0) {
            return -1;
        }
    }
    res = Math.min(res, len);
    System.arraycopy(buffer, head, b, off, res);
    head += res;
    total += res;
    return res;
}
~~~

# 源码获取

我已经按照这套想法完整地实现了文件上传组件

有兴趣的朋友可以从我的Gighub获取源码 [点我获取][github]

使用方法：[点我查看][use]






[http-get]: {{"/http-get.png" | prepend: site.imgrepo }}
[http-post]: {{"/http-post.png" | prepend: site.imgrepo }}
[boundary-A]: {{"/boundary-A.png" | prepend: site.imgrepo }}
[boundary-B]: {{"/boundary-B.png" | prepend: site.imgrepo }}
[pad]: {{"/boundary-C.png" | prepend: site.imgrepo }}
[github]: https://github.com/dubuyuye/fileupload/releases
[use]: https://github.com/dubuyuye/fileupload
[commons-fileupload]: https://github.com/apache/commons-fileupload