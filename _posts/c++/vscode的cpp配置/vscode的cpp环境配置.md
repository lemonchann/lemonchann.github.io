## 开发环境介绍

我工作环境



## 插件配置

### 生成头文件防重复引用宏

利用代码片段生成如下的头文件宏定义

```
#ifndef _MY_TEST_FILE_H_
#define _MY_TEST_FILE_H_

// here is you code...

#endif // _REDIS_FREQ_WRITE_ACTION_H_
```

设置

![image-20200510003826796](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200510003826796.png)

![image-20200510004021821](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200510004021821.png)

格式可自定义。

```
{
	"C C++ Header": {
		"scope": "c, cpp",
		"prefix": "header",
		"description": "Add #ifndef, #define and #endif",

		"body": [
			"#ifndef _${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H_",
			"#define _${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H_",
			"",
			"$0",
			"",
			"#endif // _${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H_"
		]
	}
}
```



​	

### 文件和函数注释

安装插件 `koroFileHeader`可以自定义文件头部注释和函数注释。

![image-20200510001900009](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200510001900009.png)

搜索 `filehead` 点击编辑 `settings.json` 打开配置编辑界面。

```json
// 文件头部注释
    "fileheader.customMade": {

        "Description":  "",
        "version":      "1.0",
        "Author":       "lemon",
        "Copyright":    "(C) BAT",
        "Date":         "Do not edit",
        "History":      "Date        Author      Comment"
    },

    // 函数注释
    "fileheader.cursorMode": {
    

        "name":       "",
        "description":"",
        "param":      "",
        "return":     ""
    },
    "fileheader.configObj": {
        // 自定义语言注释符号，覆盖插件的注释格式
        "language": { 
            "java": {
                "head": "/$$",
                "middle": " $ @",
                "end": " $/"
            },
        // 一次匹配多种文件后缀文件 不用重复设置
        	"h/hpp/cpp": {
            "head": "/**************************************************", // 注释开头 多个*
            "middle": " * @",                                              // 注释中间 *
            "end": " ***************************************************/" // 注释结尾 多个*
            },
            // 针对有特殊要求的文件如：test.blade.php
            "blade.php":{
            "head": "<!--",
            "middle": " * @",
            "end": "-->",
            }
        }   
    }
```



### 格式化代码

快捷键：Shift+Alt+F

![image-20200509231323363](C:\Users\linlongchen\AppData\Roaming\Typora\typora-user-images\image-20200509231323363.png)