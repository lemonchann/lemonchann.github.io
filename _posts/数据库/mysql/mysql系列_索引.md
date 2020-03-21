### 什么是索引 ？

首先我们来看下索引的概念，索引（在MySQL中也叫做“键 - key”）是存储引擎用于快速找到记录的一种数据结构。这是索引的基本功能，除此之外，索引对于良好的性能非常关键。尤其是当表中的数据量越来越大时，索引对性能的影响愈发重要。

### MySQL存储引擎类型？

在MySQL中索引是在**存储引擎**层实现的，所以我们说到索引都是依赖存储引擎，存储引擎不同对索引的实现方式也不同。 说索引之前我们先来看看有哪些MySQL存储引擎。

查看当前支持的引擎 

`show table status from db_name where name='table_name';`  查询结果表中的`Engine`字段指示存储引擎类型。

#### InnoDB存储引擎的特点和应用场景？

现代MySQL版本的InnoDB在历史上叫InnoDB plugin是个MySQL插件，在Oracle收购了Sun公司后发布的MySQL5.5才正式使用InnoDB plugin替代了旧版本的InnoDB。

现在InnoDB是MySQL的默认

#### MyISAM存储引擎的特点和应用场景？

#### 其他存储引擎

### 索引类型

#### B-Tree索引

#### hash索引

#### R-Tree索引

#### 全文索引



参考资料

 https://blog.csdn.net/shellching/article/details/8106156 

