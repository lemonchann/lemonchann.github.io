---
layout: post
title: shell
tags: shell Linux script
categories: Linux
published: false
---

* TOC
{:toc}

Shell有两种执行命令的方式：

* 交互式（Interactive）：解释执行用户的命令，用户输入一条命令，Shell就解释执行一条。

* 批处理（Batch）：用户事先写一个Shell脚本(Script)，其中有很多条命令，让Shell一次把这些命令执行完，而不必一条一条地敲命令。

几种shell：
bash（默认），sh，ash，csh，ksh

#  变量

变量名和等号之间不能有空格

首个字符必须为字母（a-z，A-Z）。

中间不能有空格，可以使用下划线（_）。

不能使用标点符号。

不能使用bash里的关键字（可用help命令查看保留关键字）。

使用变量，只要在变量名前面加美元符号（`$`）即可

加`{}`是为了帮助解释器识别变量的边界，推荐给所有变量引用加上花括号

使用 `readonly` 命令可以将变量定义为`只读`变量，只读变量的值不能被改变。

定义变量：`variableName="value"`

使用 `unset` 命令可以`删除`变量


##   变量类型

运行shell时，会同时存在三种变量：

1) 局部变量

局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。

2) 环境变量

所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。

3) shell变量

shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

##   特殊变量

`$0`	当前脚本的文件名

`$n`	传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是`$1`，第二个参数是`$2`。

`$# `	传递给脚本或函数的参数个数。

`$*`	传递给脚本或函数的所有参数。

`$@`	传递给脚本或函数的所有参数。被双引号(" ")包含时，与 `$*` 稍有不同，下面将会讲到。

`$?`	上个命令的退出状态，或函数的返回值，大部分命令执行成功会返回 0，失败返回 1；不过，也有一些命令返回其他值，表示不同类型的错误。

`$$`	当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。

`$*` 和 `$@` 的区别：`$*` 和 `$@` 都表示传递给函数或脚本的所有参数，不被双引号(" ")包含时，都以"`$1`" "`$2`" … "`$n`" 的形式输出所有参数；但是当它们被双引号(" ")包含时，"`$*`" 会将所有的参数作为一个整体，以"`$1` `$2` … `$n`"的形式输出所有参数；"`$@`" 会将各个参数分开，以"`$1`" "`$2`" … "`$n`" 的形式输出所有参数。

#  替换

转义字符

`\\`	反斜杠

`\a`	警报，响铃

`\b`	退格（删除键）

`\f`	换页(FF)，将当前位置移到下页开头

`\n`	换行

`\r`	回车

`\t`	水平制表符（tab键）

`\v`	垂直制表符

-e 表示对转义字符进行替换

-E 选项禁止转义

-n 选项可以禁止插入换行符

##   命令替换

命令替换是指Shell可以先执行命令，将输出结果暂时保存，在适当的地方输出。

~~~
#  !/bin/bash

DATE=`date`
echo "Date is $DATE"

USERS=`who | wc -l`
echo "Logged in user are $USERS"

UP=`date ; uptime`
echo "Uptime is $UP"
~~~


##   变量替换

变量替换可以根据变量的状态（是否为空、是否定义等）来改变它的值

`${var}` 变量本来的值

`${var:-word}`	如果变量 var 为空或已被删除(unset)，那么返回 word，但不改变 var 的值。

`${var:=word}`	如果变量 var 为空或已被删除(unset)，那么返回 word，并将 var 的值设置为 word。

`${var:?message}`	如果变量 var 为空或已被删除(unset)，那么将消息 message 送到标准错误输出，可以用来检测变量 var 是否可以被正常赋值。若此替换出现在Shell脚本中，那么脚本将停止运行。

`${var:+word}`	如果变量 var 被定义，那么返回 word，但不改变 var 的值。

#  运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

~~~
#  !/bin/bash

val=`expr 2 + 2`
echo "Total value : $val"
~~~

* 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。

* 完整的表达式要被 \` \` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。

##   算术运算符

`+`	加法	`expr $a + $b` 

`-`	减法	`expr $a - $b`

`*`	乘法	`expr $a \* $b`

`/`	除法	`expr $b / $a`

`%`	取余	`expr $b % $a`

`=`	赋值

`==`	相等。

`!=`	不相等。

乘号(*)前边必须加反斜杠(\)才能实现乘法运算

##   关系运算符

`-eq`	检测两个数是否相等，相等返回 true。

`-ne`	检测两个数是否相等，不相等返回 true。

`-gt`	检测左边的数是否大于右边的，如果是，则返回 true。

`-lt`	检测左边的数是否小于右边的，如果是，则返回 true。

`-ge`	检测左边的数是否大等于右边的，如果是，则返回 true。

`-le`	检测左边的数是否小于等于右边的，如果是，则返回 true。

##   布尔运算符

`!`	非运算，表达式为 true 则返回 false，否则返回 true。

`-o`	或运算，有一个表达式为 true 则返回 true。

`-a`	与运算，两个表达式都为 true 才返回 true。

##   字符串运算符

`=`	检测两个字符串是否相等，相等返回 true。	

`!=`	检测两个字符串是否相等，不相等返回 true。

`-z str`	检测字符串长度是否为0，为0返回 true。

`-n str`	检测字符串长度是否不为0，不为0返回 true。

`str`	检测字符串是否为空，不为空返回 true。

##   文件测试运算符

文件测试运算符用于检测 Unix 文件的各种属性。

`-b file`	检测文件是否是块设备文件，如果是，则返回 true。

`-c file`	检测文件是否是字符设备文件，如果是，则返回 true。

`-d file`	检测文件是否是目录，如果是，则返回 true。

`-f file`	检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。

`-g file`	检测文件是否设置了 SGID 位，如果是，则返回 true。

`-k file`	检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。

`-p file`	检测文件是否是具名管道，如果是，则返回 true。

`-u file`	检测文件是否设置了 SUID 位，如果是，则返回 true。

`-r file`	检测文件是否可读，如果是，则返回 true。

`-w file`	检测文件是否可写，如果是，则返回 true。

`-x file`	检测文件是否可执行，如果是，则返回 true。

`-s file`	检测文件是否为空（文件大小是否大于0），不为空返回 true。

`-e file`	检测文件（包括目录）是否存在，如果是，则返回 true。

#  注释

以“# ”开头的行就是注释，会被解释器忽略。

sh里没有多行注释，只能每一行加一个# 号。可以把这一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

#  字符串

单引号字符串的限制：

* 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；

* 单引号字串中不能出现单引号（对单引号使用转义符后也不行）。

双引号的优点：

* 双引号里可以有变量

* 双引号里可以出现转义字符

拼接字符串

~~~
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"

echo $greeting $greeting_1
~~~

获取字符串长度

~~~
string="abcd"
echo ${# string} # 输出 4
~~~

提取子字符串

~~~
string="alibaba is a great company"
echo ${string:1:4} # 输出liba
~~~

查找子字符串

`expr index String1 String2` 返回 String1 中包含 String2 中任意字符的第一个位置。（从1开始数）

~~~
string="alibaba is a great company"
echo `expr index "$string" is`
~~~

#  数组

bash支持一维数组（不支持多维数组），并且没有限定数组的大小。类似与C语言，数组元素的下标由0开始编号。获取数组中的元素要利用下标，下标可以是整数或算术表达式，其值应大于或等于0。

##   定义

在Shell中，用括号来表示数组，数组元素用“空格”符号分割开。定义数组的一般形式为：array_name=(value1 ... valuen)

~~~
array_name=(value0 value1 value2 value3)

array_name=(
value0
value1
value2
value3
)

array_name[0]=value0
array_name[1]=value1
array_name[2]=value2
~~~

##   读取

~~~
valuen=${array_name[2]}
~~~

使用`@`或 `*` 可以获取数组中的所有元素

~~~
${array_name[*]}
${array_name[@]}
~~~

##   长度

~~~
#   取得数组元素的个数
length=${# array_name[@]}
#   或者
length=${# array_name[*]}
#   取得数组单个元素的长度
lengthn=${# array_name[n]}
~~~

#  echo

echo是Shell的一个内部指令，用于在屏幕上打印出指定的字符串。

`-n` 不要在最后自动换行

`-e` 若字符串中出现以下字符，则特别加以处理，而不会将它当成一般

文字输出：

>`\a` 发出警告声；
>
>`\b` 删除前一个字符；
>
>`\c` 最后不加上换行符号；
>
>`\f` 换行但光标仍旧停留在原来的位置；
>
>`\n` 换行且光标移至行首；
>
>`\r` 光标移至行首，但不换行；
>
>`\t` 插入tab；
>
>`\v` 与\f相同；
>
>`\\` 插入\字符；
>
>`\nnn` 插入nnn（八进制）所代表的ASCII字符；

`–help` 显示帮助

`–version` 显示版本信息

##   原样输出字符串

若需要原样输出字符串（不进行转义），请使用单引号

~~~
echo '$name\"'
~~~

##   显示命令执行结果

~~~
echo `date`
~~~

#  printf

printf 命令用于格式化输出， 是echo命令的增强版。它是C语言printf()库函数的一个有限的变形，并且在语法上有些不同。

注意：printf 由 POSIX 标准所定义，移植性要比 echo 好。

printf 不像 echo 那样会自动换行，必须显式添加换行符(\n)。

~~~
$printf "Hello, Shell\n"
Hello, Shell
$

~~~
printf 命令的语法

~~~
printf  format-string  [arguments...]
~~~

format-string 为格式控制字符串，arguments 为参数列表。

这里仅说明与C语言printf()函数的不同：

* printf 命令不用加括号

* format-string 可以没有引号，但最好加上，单引号双引号均可。

* 参数多于格式控制符(%)时，format-string 可以重用，可以将所有参数都转换。

* arguments 使用空格分隔，不用逗号。

注意，根据POSIX标准，浮点格式%e、%E、%f、%g与%G是“不需要被支持”。这是因为awk支持浮点预算，且有它自己的printf语句。这样Shell程序中需要将浮点数值进行格式化的打印时，可使用小型的awk程序实现。然而，内建于bash、ksh93和zsh中的printf命令都支持浮点格式。

#  分支

Shell 有三种 if ... else 语句：

* if ... fi 语句；

* if ... else ... fi 语句；

* if ... elif ... else ... fi 语句。


最后必须以 fi 来结尾闭合 if，fi 就是 if 倒过来拼写，后面也会遇见。
注意：expression 和方括号([ ])之间必须有空格，否则会有语法错误。

##   if  

~~~
if [ expression ]
then
   statements
fi
~~~

##   if else

~~~
if [ expression ]
then
   Statements
else
   Statements
fi
~~~

##   if  elif  fi

~~~
if [ expression 1 ]
then
   Statements
elif [ expression 2 ]
then
   Statements
elif [ expression 3 ]
then
   Statements
else
   Statements
fi
~~~

if ... else 语句也可以写成一行，以命令的方式来运行，经常与 test 命令结合使用
`test` 命令用于检查某个条件是否成立，与方括号([ ])类似。

~~~
if test $[2*3] -eq $[1+5]; then echo 'The two numbers are equal!'; fi;
~~~

#  多分枝选择

case ... esac 与其他语言中的 switch ... case 语句类似，是一种多分枝选择结构。
case 语句匹配一个值或一个模式，如果匹配成功，执行相匹配的命令。

~~~
case 值 in
模式1)
    command1
    command2
    command3
    ;;
模式2)
    command1
    command2
    command3
    ;;
*)
    command1
    command2
    command3
    ;;
esac
~~~

取值后面必须为关键字 `in`

每一模式必须以`)`结束

`;;` 与其他语言中的 break 类似

~~~
#  !/bin/bash

option="${1}"
case ${option} in
   -f) FILE="${2}"
      echo "File name is $FILE"
      ;;
   -d) DIR="${2}"
      echo "Dir name is $DIR"
      ;;
   *) 
      echo "`basename ${0}`:usage: [-f file] | [-d directory]"
      exit 1 #  Command to come out of the program with status 1
      ;;
esac
~~~

#  循环

##   for

~~~
for 变量 in 列表
do
    command1
    command2
    ...
    commandN
done
~~~

列表是一组值（数字、字符串等）组成的序列，每个值通过空格分隔。每循环一次，就将列表中的下一个值赋给变量。

~~~
#  !/bin/bash

for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
~~~

~~~
#  !/bin/bash

for FILE in $HOME/.bash*
do
   echo $FILE
done
~~~

##   while

~~~
while command
do
   statements
done
~~~

~~~
COUNTER=0
while [ $COUNTER -lt 5 ]
do
    COUNTER=`expr $COUNTER+1`
    echo $COUNTER
done
~~~

while循环可用于读取键盘信息

~~~
echo 'type <CTRL-D> to terminate'
echo -n 'enter your most liked film: '
while read FILM
do
    echo "Yeah! great film the $FILM"
done
~~~

##   until

until 循环执行一系列命令直至条件为 `true` 时`停止`。until 循环与 while 循环在处理方式上刚好相反。一般while循环优于until循环，但在某些时候，也只是极少数情况下，until 循环更加有用。

~~~
until command
do
   statements
done
~~~

##   跳出循环

### break

break将终止循环体中的后续操作

在嵌套循环中，break 命令后面还可以跟一个整数，表示跳出第几层循环`break n`

### continue

continue跳出当次循环

同样，continue 后面也可以跟一个数字，表示跳出第几层循环`continue n`

#  函数

##   定义

~~~
function_name () {
    list of commands
    [ return value ]
}

#  可以加上function 关键字
function function_name () {
    list of commands
    [ return value ]
}
#  函数返回值，可以显式增加return语句；如果不加，会将最后一条命令运行结果作为返回值。
~~~

Shell 函数返回值只能是整数，一般用来表示函数执行成功与否，0表示成功，其他值表示失败。如果 return 其他数据，比如一个字符串，往往会得到错误提示：“numeric argument required”。

如果一定要让函数返回字符串，那么可以先定义一个变量，用来接收函数的计算结果，脚本在需要的时候访问这个变量来获得函数返回值。


~~~
#  !/bin/bash
funWithReturn(){
    echo "The function is to get the sum of two numbers..."
    echo -n "Input first number: "
    read aNum
    echo -n "Input another number: "
    read anotherNum
    echo "The two numbers are $aNum and $anotherNum !"
    return $(($aNum+$anotherNum)) 
    # 两组括号的意思是做算术运算，如果不这么写直接写$a+$b的话，是按字符串理解的，就是25+50这个字符串
}
funWithReturn
#   Capture value returnd by last command
ret=$?
echo "The sum of two numbers is $ret !"
~~~

调用函数只需要给出函数名，不需要加括号。

函数返回值在调用该函数后通过 `$?` 来获得。

##   嵌套

~~~
#  !/bin/bash

#   Calling one function from another
number_one () {
   echo "Url_1 is http://see.xidian.edu.cn/cpp/shell/"
   number_two
}

number_two () {
   echo "Url_2 is http://see.xidian.edu.cn/cpp/u/xitong/"
}

number_one
~~~

##   删除

~~~
unset .f function_name
~~~

##   参数

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 `$n` 的形式来获取参数的值，例如，`$1`表示第一个参数，`$2`表示第二个参数...

~~~
#  !/bin/bash
funWithParam(){
    echo "The value of the first parameter is $1 !"
    echo "The value of the second parameter is $2 !"
    echo "The value of the tenth parameter is $10 !"
    echo "The value of the tenth parameter is ${10} !"
    echo "The value of the eleventh parameter is ${11} !"
    echo "The amount of the parameters is $#  !"  #  参数个数
    echo "The string of the parameters is $* !"  #  传递给函数的所有参数
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
~~~

注意，`$10` 不能获取第十个参数，获取第十个参数需要`${10}`。当n>=10时，需要使用`${n}`来获取参数。

特殊参数

`$# `	传递给函数的参数个数。

`$*`	显示所有传递给函数的参数。

`$@`	与`$*`相同，但是略有区别，请查看Shell特殊变量。

`$?`	函数的返回值。

#  IO重定向

~~~
command > file
command < file
~~~

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：

* 标准输入文件(`stdin`)：stdin的文件描述符为`0`，Unix程序默认从stdin读取数据。

* 标准输出文件(`stdout`)：stdout 的文件描述符为`1`，Unix程序默认向stdout输出数据。

* 标准错误文件(`stderr`)：stderr的文件描述符为`2`，Unix程序会向stderr流中写入错误信息。

 stderr 重定向到 file

~~~
 command 2 > file
~~~

将 stdout 和 stderr 合并后重定向到 file

~~~
command > file 2>&1
~~~

默认情况下，command > file 将 stdout 重定向到 file，command < file 将stdin 重定向到 file。

`command > file`	将输出重定向到 file。

`command < file`	将输入重定向到 file。

`command >> file` 	将输出以追加的方式重定向到 file。

`n > file`	将文件描述符为 n 的文件重定向到 file。

`n >> file`	将文件描述符为 n 的文件以追加的方式重定向到 file。

`n >& m`	将输出文件 m 和 n 合并。

`n <& m`	将输入文件 m 和 n 合并。

`<< tag`	将开始标记 tag 和结束标记 tag 之间的内容作为输入。

##   Here Document

~~~
command << delimiter
    document
delimiter
~~~

它的作用是将两个 delimiter 之间的内容(document) 作为输入传递给 command。
注意：

* 结尾的delimiter 一定要顶格写，前面不能有任何字符，后面也不能有任何字符，包括空格和 tab 缩进。

* 开始的delimiter前后的空格会被忽略掉。

##   /dev/null 

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到”禁止输出“的效果。
屏蔽 stdout 和 stderr

~~~
command > /dev/null 2>&1
~~~

#  文件包含

Shell 也可以包含外部脚本，将外部脚本的内容合并到当前脚本

~~~
. filename
#  或
source filename
~~~

两种方式的效果相同，简单起见，一般使用点号(.)，但是注意点号(.)和文件名中间有一空格

脚本 subscript.sh

~~~
url="http://see.xidian.edu.cn/cpp/view/2738.html"
~~~

引入当前目录下的subscript.sh脚本

~~~
#  !/bin/bash
. ./subscript.sh
echo $url
~~~
