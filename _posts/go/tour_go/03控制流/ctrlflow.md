对于一般的语言使用者来说 ，20% 的语言特性就能够满足 80% 的使用需求，剩下在使用中掌握。基于这一理论，Go 基础系列的文章不会刻意追求面面俱到，但该有知识点都会覆盖，目的是带你快跑赶上 Golang 这趟新车。

控制语句是程序的灵魂，有了它们程序才能完成各种逻辑，今天我们就来学习 Go 中的各种控制语句。

通过本文的学习你将掌握以下知识：

- if 条件语句
- for 循环语句
- switch 语句
- defer 延迟调用



## if 条件语句

与大多数编程语言一样，`if` 用于条件判断，当条件表达式 `expr` 为 `true` 执行 `{}` 包裹的消息体语句，否则不执行。

语法是这样的：

```go
if expr {
    // some code
}
```

**注意：**语法上和 `c` 语言不同的是不用在条件表达式 `expr` 外带括号，和 `python` 的语法类似。

当然，如果想在条件不满足的时候做点啥，就可以 `if` 后带 `else` 语句。语法：

```go
if expr {
    // some code
} else {
    // another code
}
```



### 不仅仅是 if

 除了可以在 `if` 中做条件判断之外，在 Golang 中你甚至可以在 `if` 的条件表达式前执行一个简单的语句。 

举个例子：

```go
if x2 := 1; x2 > 10 { 
    fmt.Println("x2 great than 10")
} else {
    fmt.Println("x2 less than 10", x2)
}
```

上面的例子在 `if` 语句中先声明并赋值了 `x2`，之后对 `x2` 做条件判断。

**注意：**此处在 `if` 内声明的变量 `x2` 作用域仅限于 if 和else 语句。



## for循环语句

当需要重复执行的时候需要用到循环语句，**Go 中只有 `for` 这一种循环语句。**

标准的for循环语法：

```go
for 初始化语句; 条件表达式; 后置语句 {
    // some code
}
```

这种语法形式和 C 语言中 `for` 循环写法还是很像的，不同的是不用把这三个部分用 `()` 括起来。循环执行逻辑：

- 初始化语句：初始循环时执行一次，做一些初始化工作，一般是循环变量的声明和赋值。
- 条件表达式：在每次循环前对条件表达式求值操作，若求值结果是 `true` 则执行循环体内语句，否则不执行。
- 后置语句：在每次循环的结尾执行，一般是做循环变量的自增操作。

举个例子：

```go
sum := 0
for i := 0; i < 10; i++ {
    sum += i // i作用域只在for语句内
    fmt.Println(i, sum)
}
```

注意：循环变量` i` 的作用域只在 `for` 语句内，超出这个范围就不能使用了。



### while循环怎么写？

前面说了，Golang 中只有 `for` 这一种循环语法，那有没有类似 C 语言中 `while` 循环的写法呢？答案是有的：把 `for` 语句的前后两部分省略，只留中间的「条件表达式」的 `for` 语句等价于 `while` 循环。

像下面这样：

```go
sum1 := 0
for ;sum1 < 10; { // 可以省略初始化语句和后置语句
    sum1++
    fmt.Println(sum1)
}
```

上面的示例没有初始化语句和后置语句，会循环执行 10 次后退出。

当然你要是觉得前后的分号也不想写了，也可以省略不写，上面的代码和下面是等效的：

```go
sum1 := 0
for sum1 < 10 { // 可以省略初始化语句和后置语句，分号也能省略
    sum1++
    fmt.Println(sum1)
}
```

在 Golang 中死循环可以这样写，相当于 C 语言中的 `while(true)`

```go
 for { // 死循环
 	// your code
 }
```



## switch 语句

`switch` 语句可以简化多个 `if-else` 条件判断写法，避免代码看起来杂乱。

可以先定义变量，然后在 `switch` 中使用这个变量。

```go
	a := 1
    switch a {
	case 1: 
		fmt.Println("case 1") // 不用写break 执行到这自动跳出
	case 2:
		fmt.Println("case 2")
	default:
		fmt.Printf("unexpect case")
	}
```

```shell
输出：case 1
```



从 C 语言过来的朋友一定有这样的经历：经常会在 case 语句中漏掉 break 导致程序继续往下执行，从而产生奇奇怪怪的 `bug` ，这种问题在 Golang 中不复存在了。Golang 在每个 case 后面隐式提供 `break` 语句。 除非以 `fallthrough` 语句结束，否则分支会自动终止。 

```go
	switch a := 1; a { //这里有分号
	case 1: // case 无需为常量，且取值不必为整数。
		fmt.Println("case 1") // 不用写break 执行到自动跳出 除非以 fallthrough 语句结束
		fallthrough
	case 2:
		fmt.Println("case 2")
	default:
		fmt.Printf("unexpect case")
	}
```

```
输出：
case 1
case 2
```

还可以直接在 `switch` 中定义变量后使用，**但是要注意变量定义之后又分号**，比如下面这样：

```go
	switch b :=1; b { //注意这里有分号
	case 1: 
		fmt.Println("case 1") 
	case 2:
		fmt.Println("case 2")
	default:
		fmt.Printf("unexpect case")
	}
```



### 没有条件的switch

没有条件的 switch 同 `switch true` 一样，只有当 `case` 中的表达式值为「真」时才执行，这种形式能简化复杂的 `if-else-if else ` 语法。

下面是用 `if` 来写多重条件判断，这里写的比较简单若是再多几个 `else if` 代码结构看起来会更糟糕。 

```go
    a := 1
    if a > 0 {
        fmt.Println("case 1") 
    } else if a < 0 {
        fmt.Println("case 2")   
    } else {
        fmt.Printf("unexpect case")   
    }
```

如果用上不带条件的 `switch` 语句，写出来就会简洁很多，像下面这样。 

```go
	a := 1
	switch {    // 相当于switch true
	case a > 0: // 若表达式为「真」则执行 
		fmt.Println("case 1") 
	case a < 0:
		fmt.Println("case 2")
	default:
		fmt.Printf("unexpect case")
	}
```



## defer 语句

`defer` 语句有延迟调用的效果。具体来说`defer`后面的函数调用会被**压入堆栈**，当外层函数返回才会对压栈的函数按后进先出顺序调用。说起来有点抽象，举个例子：

```go
package main

import "fmt"

func main() {
	fmt.Println("entry main")
	for i := 0; i < 6; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("exit main")
}
```

`fmt.Println(i)` 不会每次立即执行，而是在 `main` 函数返回之后才依次调用，编译运行上述程序的输出：

```shell
entry main
exit main  //外层函数返回
5
4
3
2
1
0
```

上面是简单的使用示例，实际使用中**`defer` 通常用来释放函数内部变量，因为它可以在外层函数 `return` 之后继续执行一些清理动作。**这在文件类操作异常处理中非常实用，比如用于释放文件描述符，我们以后会讲解这块应用，总之先记住 `defer` 延迟调用的特点。



## 总结

通过本文的学习，我们掌握了 Golang 中基本的控制流语句，利用这些控制语句加上一节介绍的变量等基础知识，可以构成丰富的程序逻辑，你就能用 Golang 来做一些有意思的事情了。

感谢各位的阅读，文章的目的是分享对知识的理解，技术类文章我都会反复求证以求最大程度保证准确性，若文中出现明显纰漏也欢迎指出，我们一起在探讨中学习.

今天的技术分享就到这里，我们下期再见。

-----



**创作不易，白票不是好习惯，如果有收获，动动手指点个「在看」或给个「转发」是对我持续创作的最大支持**



## reference

[golang中defer的使用规则](https://studygolang.com/articles/10167)

[GO 匿名函数和闭包](https://segmentfault.com/a/1190000018689134)