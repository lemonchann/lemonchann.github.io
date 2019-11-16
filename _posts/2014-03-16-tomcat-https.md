---
layout: post
title: Tomcat Https 配置
tags: tomcat Http Https ssl Java
categories: Java
published: false
---

#### `1`.生成秘钥库

~~~bash
keytool 
    –genkey
    –keyalg 算法(通常用RSA)
    –dname "cn=服务器名,
            ou=组织单位名,
            o=组织名,
            l=城市名,
            st=省/市/自治区,
            c=国家双字母代码"
    -alias 别名(非必选项)
    -keypass 密码
    -keystore 秘钥库文件名
    -storepass 密码
    -validity 有效天数
~~~
 
#### `2`.生成浏览器证书文件

~~~bash
keytool
    -export 
    -keystore 秘钥库文件名
    -alias 秘钥库别名(非必选项)
    -storepass 秘钥库密码
    -file 证书文件名
~~~

#### `3`.生成私钥文件

~~~bash
keytool 
    -importkeystore 
    -srckeystore 秘钥库文件名
    -deststoretype PKCS12
    -destkeystore p12文件名

openssl 
	pkcs12 
	-in p12文件名
	-out pem文件名
	-nodes
~~~

#### `4`.Tomcat配置

打开 %CATALINA_HOME%/conf/server.xml

解开注释或添加代码(443为https默认端口，不会在URL中显示)

~~~bash
<Connector port="443" protocol="HTTP/1.1" SSLEnabled="true"
    maxThreads="150" scheme="https" secure="true"
    clientAuth="false" sslProtocol="TLS" 
    SSLCertificateFile="证书文件名"   
    SSLCertificateKeyFile="pem文件名"/>
~~~

#### `5`.强制https访问

打开 %CATALINA_HOME%/conf/web.xml

添加代码

~~~xml
<!-- SSL -->
<login-config>  
    <!-- Authorization setting for SSL -->  
    <auth-method>CLIENT-CERT</auth-method>  
    <realm-name>Client Cert Users-only Area</realm-name>  
</login-config>  
<security-constraint>  
    <!-- Authorization setting for SSL -->  
    <web-resource-collection >  
        <web-resource-name >SSL</web-resource-name>  
        <url-pattern>/*</url-pattern>  
    </web-resource-collection>  
    <user-data-constraint>  
        <transport-guarantee>CONFIDENTIAL</transport-guarantee>  
    </user-data-constraint>  
</security-constraint> 
~~~
