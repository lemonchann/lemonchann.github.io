> 对于一般的语言使用者来说 ，20% 的语言特性就能够满足 80% 的使用需求，剩下在使用中掌握。基于这一理论，Go 基础系列的文章不会刻意追求面面俱到，但该有知识点都会覆盖，目的是带你快跑赶上 Golang 这趟新车。

最近工作上和生活上的事情都很多，这篇文章计划是周末发的，但是周末太忙时间不够，同时为了保证文章质量，反复修改到现在才算完成。

有时候还是很想回到学校，一心只用读书睡觉打游戏的日子，成年人的世界总是被各种中断，有各种各样的事情要处理。

 ![img](https://i04piccdn.sogoucdn.com/a4eabef05f7da82e) 

**答应大家要写完的 Go 基础系列可能会迟到，但不会缺席。今天我们来继续学习，Go 中的面向对象编程思想，包括 方法 和 接口 两大部分学习内容。**

通过学习本文，你将了解：

- Go 的方法定义
- 方法和函数的区别
- 方法传值和传指针差异
- 什么是接口类型
- 如何判断接口底层值类型
- 什么是空接口
- nil 接口 和nil 底层值



如果你使用 C++ 或 Java 这类面向对象的语言，肯定知道类 `class` 和方法 `method` 的概念，Golang 中没有` class `关键字，但有上节介绍的 `struct` 结构体提供类似功能，配合方法和接口的支持，完成面向对象的程序设计完全没有问题，下面我们就来学习下方法和接口。

## 方法

### 定义

方法就是一类带特殊的接收者参数的函数 ，这些特殊的参数可以是结构体也可以是结构体指针，但不能是内置类型。

为了便于说明，先来定义一个结构体 `Person` 包含` name `和 `age` 属性。

```go
type Person struct {
	name string
	age  int
}
```

下面给 `Person` 定义两个方法，分别用于获取` name `和` age ` ，重点看下代码中方法的定义语法。

```go
func (p Person) GetName() string {
	return p.name + "'s age is"
}

func (p Person) GetAge() int {
	return p.age
}
```



### 和函数定义的区别

看了上面的方法定义是不是觉得和函数定义有点类似，还记得函数的定义吗？为了唤起你的记忆，下面分别定义两个相同功能的函数，大家可以对比一下。

```go
func GetNameF(p Person) string {
	return p.name + "'s age is"
}

func GetNameF(p Person) int {
	return p.age
}
```

除了定义上的区别，还有调用上的区别。下面示例代码演示了两种调用方式的不同，在`fmt.Println` 中前面 2 个是正常函数调用，后面 2 个是方法调用，就是用点号`.` 和括号`()` 的区别。

```go
p := Person{"lemon", 18}
fmt.Println(GetNameF(p), GetNameF(p), p.GetName(), p.GetAge()) 
//输出 lemon's age is 18 lemon's age is 18
```



### 修改接收者的值

上面我演示的方法 `GetName` 和`GetAge` 的接收者是` Person `值，这种值传递方式是没办法修改接收者内部状态的，比如你没法通过方法调用修改 `Person `的` name` 或`age `。

假设有个需求要修改用户年龄，我们像下面这样定义方法 `ageWriteable` ，调用该方法之后 `p` 的 `name` 属性并不会变化。

```go
func (p *Person) ageWriteable() int {
	p.age += 10
	return p.age
}
```

那要怎么才能实现对 `p` 的修改呢? 没错用  `*Person` 指针类型即可实现修改。类比 `C++` 中用指针或引用来理解。

```go
func (p *Person) ageWriteable() int {
	p.age += 10
	return p.age
}
```



### 隐式值与指针转换

Golang 非常的聪明，为了不让你麻烦，它能自动识别方法的实际接收者类型（指针或值），并默默的帮你做转换，以便「方法」能正确的工作。

还是用我们上面定义的方法举例，先来看以「值」作为接收者的方法调用。方便阅读，我把前面的定义再写一遍。

```go
func (p Person) GetName() string {
	return p.name + "'s age is"
}
```

对于这个定义的方法，按下面的调用方式 `p `和 `pp` 都能调用 `GetName`  方法。

怎么做到的呢？原来 `pp` 在调用方法时 Go 默默的做了隐式的转换，其实是按照 `(*pp).GetName*()` 去调用方法，怎么实现转换的这点我们不用关心，先用起来就可以。

```go
	p := Person{"lemon", 18}
	pp := &Person{"lemon", 18}
	fmt.Println(p.GetName(), pp.GetName()) // p 和 pp都能调用 GetName 方法
```



**同理，对接收者是指针的方法，也可以按给它传递值的方式来调用，这里不再赘述。**



对方法的说明，就简单介绍到这里，更多细节不去深究，留给大家在使用中学习。



## 接口

接口我想不到准确的描述语句来说明他，通俗来讲接口类型就是一类预先约定好的方法声明集合。

接口定义就是把一系列可能实现的方法先声明出来，后面只要哪个类型完全实现了某个接口声明的方法，就可用这个「接口变量」来保存这些方法的值，其实是抽象设计的概念。

**可以类比 `C++` 中的纯虚函数。**

### 定义

为了说明接口如何定义，我们要做一些准备工作。

1. 先来定义两个类型，代表男人女人，他们都有属性 `name` 和 `age`

```go
type man struct {
	name string
	age  int
}

type woman struct {
	name string
	age  int
}
```

2. 再来分别定义两个类型的方法，`getName` 和 `getAge` 用于获取各自的姓名和年龄。

```go
func (m *man) getName() string {
	return m.name
}

func (m *woman) getName() string {
	return m.name
}

func (m *man) getAge() int {
	return m.age
}

func (m *woman) getAge() int {
	return m.age
}
```

好了， 下面我们的主角「接口」登场， 我们来实现一个通用的 `humanIf` 接口类型，这个接口包含了 `getName()` 方法声明，注意接口包含的这个方法的声明样式，和前面我们定义的 `man` 与 `women` 的 `getName` 方法一致。同理 `getAge()`样式也一致。

```go
type humanIf interface {
    getName() string
    getAge() int
}
```

**现在可以使用这个接口了！不管男人女人反正都是人，是人就可以用我的 `humanIf` 接口获取姓名。**

```go
var m humanIf = &man{"lemon", 18}
var w humanIf = &woman{"hanmeimei", 19}
fmt.Println(m.getName(), w.getName()) 
```



### 接口类型

当给定一个接口值，我们如何知道他代表的底层值的具体类型呢？还是上面的例子，我们拿到了 `humanIf` 类型的变量  `m ` 和 `w`， 怎么才能知道它们到底是 `man` 还是 `women `类型呢？ 

有两种方法可以确定变量  `m ` 和 `w` 的底层值类型。

- 类型断言

断言如果不是预期的类型，就会抛出 `panic `异常，程序终止。

如果断言是符合预期的类型，会把调用者实际的底层值返回。

```go
v0 := w.(man) // w保存的不是 man 类型，程序终止

v1 := m.(man) // m保存的符合 man 类型，v1被赋值 m 的底层值 

v, right := a.(man)  // 两个返回值，第一个是值，第二代表是否断言正确的布尔值
fmt.Println(v, right)
```



- 类型选择

相比类型断言直接粗暴的让程序终止，「类型选择」语法更加的温和，即使类型不符合也不会让程序挂掉。

下面示例，`v3`  获得 `w`  的底层类型，在后面 `case` 通过类型比较打印出匹配的类型。注意：`type` 也是关键字。

```go
	
	switch v3 := w.(type) {
	case man:
		fmt.Println("it is type:man", v3)
	case women:
		fmt.Println("it is type:women", v3)
	default:
		fmt.Printf("unknow type:%T value:%v", v3, v3)
	}
```



### 空接口

空接口 `interface{}` 代表包含了 0 个方法的接口，试想一下每个类型都至少实现了零个方法，所以任何类型都可以给空接口类型赋值。

下面示例，用 `man` 值给空接口赋值。

```go
  type nilIf interface{}
  var ap nilIf = &man{"lemon", 18}

  //等价定义
  var ap interface{} = &man{"lemon", 18} //等价于上面一句
```

空接口可以接收任何类型的值，包括指针、值甚至是`nil` 值。

```go
  // 接收指针
  var ap nilIf = &man{"lemon", 18}
  fmt.Println("interface", ap)
  // 接收值
  var a nilIf = man{"lemon", 18}
  fmt.Println("interface", a)
  // 接收nil值
  var b nilIf
  fmt.Println("interface", b)
```



### 处理nil接口调用

#### nil底层值不会引发异常

对 C 或 C++ 程序员来说空指针是噩梦，如果对空指针做操作，结果是不可预知的，很大概率会导致程序崩溃，程序莫名其妙挂掉，想想就令人头秃。

 ![img](https://i04piccdn.sogoucdn.com/c4ead94ec095d457) 

`Golang` 中处理空指针这种情况要优雅的多，**允许用空底层值调用接口**，但是要修改方法定义，正确处理 `nil` 值避免程序崩溃。

```go
func (m *man) getName() string {
	if m == nil {
		return "nil"
	}

	return m.name
}
```

下面演示了使用处理了 `nil` 值的方法，虽然 `nilMan` 是空指针，但仍然可以调用 `getName` 方法。

```go
	var nilMan *man // 定义了一个空指针 nilMan
	var w humanIf = nilMan
	fmt.Println(w.getName())
```



#### nil接口引发程序异常

但是，如果接口本身是 `nil` 去调用方法，仍然会引发异常。

```go
	manIf = nil
	fmt.Println("interface", manIf.getName())
```



## 总结

本节学习的接口和方法是 `Golang` 对面向对象程序设计的支持，可以看到实现的非常简洁，并没常用的面向对象语言那么复杂的语法和关键字，简单不代表不够好，实际上也基本够用，一句话概括就是简洁并不简单。

感谢各位的阅读，文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习。

今天的技术分享就到这里，我们下期再见。

-----



**创作不易，白票不是好习惯，如果有收获，动动手指点个「在看」或给个「转发」是对我持续创作的最大支持**

