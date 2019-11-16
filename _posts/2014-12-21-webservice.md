---
layout: post
title: WebService
tags: WebService Java
categories: web
---

* TOC
{:toc}


**WSDL**

`definitions` 为根节点，属性为

>`name`：WS 名称，默认为“实现类 + Service”
>
>`targetNamespace`：WS 目标命名空间，默认为“WS 实现类对应包名倒排后构成的地址”

`definitions`的5个子节点

>`types`：描述了 WS 中所涉及的数据类型
>
>`portType`：定义了 WS 接口名称`portType.name`（`endpointInterface`默认为“WS 实现类所实现的接口”），及其操作名称，以及每个操作的输入与输出消息
>
>`message`：对相关消息进行了定义（供 types 与 portType 使用）
>
>`binding`：提供了对 WS 的数据绑定方式
>
>`service`：WS 名称及其端口名称`service_port.name`（`portName`默认为“WS 实现类 + Port”），以及对应的 WSDL 地址

**SOAP**

`header`

`body`

---

# `一`、产品

**soap**风格 (JAX-WS规范JSR-224)

JAX-WS RI：https://jax-ws.java.net/    Oracle 官方提供的实现

Axis：http://axis.apache.org/

CXF：http://cxf.apache.org/

**rest**风格 (JAX-RS规范JSR-339)

Jersey：https://jersey.java.net/    Oracle 官方提供的实现

Restlet：http://restlet.com/

RESTEasy：http://resteasy.jboss.org/

CXF：http://cxf.apache.org/

# `二`、JDK发布与调用

## `1`.发布

### 定义接口

~~~java
//此注解必须
@WebService
public interface HelloService {
    String say();
}
~~~

### 实现接口

~~~java
@WebService(serviceName = "HelloService",
        portName = "HelloServicePort",
        endpointInterface = "org.sllx.practice.jdkws.HelloService")
public class HelloServiceImpl implements HelloService {
    @Override
    public String say() {
        return "helloWorld";
    }
}
~~~

### 发布服务

~~~java
public class Server {
    public static void main(String[] args){
        String address = "http://localhost:8081/ws/soap/hello";
        HelloService helloService = new HelloServiceImpl();
        Endpoint.publish(address, helloService);
        System.out.println("ws is published [" + address + "?wsdl]");
    }
}
~~~

访问`http://localhost:8081/ws/soap/hello?wsdl`即可查看详情

## `2`.调用

### 静态客户端

 `wsimport http://localhost:8080/ws/soap/hello?wsdl`//通过 WSDL 地址生成 class 文件

 `jar -cf client.jar .` //通过 jar 命令将若干 class 文件压缩为一个 jar 包

`rmdir /s/q demo `//删除生成的 class 文件（删除根目录即可）

~~~java
public static void main(String[] args){
     HelloService_Service hss = new HelloService_Service();
     HelloService hs = hss.getHelloServicePort();
     System.out.println(hs.say());
}
~~~

### 动态代理客户端

只需提供`HelloService`接口，无需jar

~~~java
public static void main(String[] args){
    try {
        URL wsdl = new URL("http://localhost:8081/ws/soap/hello?wsdl");
        QName serviceName = new QName("http://jdkws.practice.sllx.org/", "HelloService");
        QName portName = new QName("http://jdkws.practice.sllx.org/", "HelloServicePort");
        Service service = Service.create(wsdl, serviceName);
        HelloService helloService = service.getPort(portName, HelloService.class);
        String result = helloService.say();
        System.out.println(result);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
~~~

# `三`、CXF

User为自定义的POJO类

web发布示例集成spring

## `1.`SOAP风格

### 定义接口

~~~java
package top.rainynight.sitews.user.ws;

import top.rainynight.sitews.user.entity.User;
import javax.jws.WebService;

@WebService
public interface UserWS {

    User lookOver(int id);
}
~~~

### 实现接口

~~~java
package top.rainynight.sitews.user.ws;

import top.rainynight.sitews.user.entity.User;
import org.springframework.stereotype.Component;

@Component("userWS")
public class UserWSImpl implements UserWS {

    @Override
    public User lookOver(int id) {
        return new User();
    }
}
~~~


### 发布服务

#### ①Jetty发布

配置依赖

~~~xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <cxf.version>3.0.0</cxf.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-rt-frontend-jaxws</artifactId>
        <version>${cxf.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-rt-transports-http-jetty</artifactId>
        <version>${cxf.version}</version>
    </dependency>
</dependencies>
~~~

发布

~~~java
public class JaxWsServer {
    public static void main(String[] args) {
        JaxWsServerFactoryBean factory = new JaxWsServerFactoryBean();
        factory.setAddress("http://localhost:8080/ws/user");
        factory.setServiceClass(UserWS.class);
        factory.setServiceBean(new UserWSImpl());
        factory.create();
        System.out.println("soap ws is published");
    }
}
~~~

访问`http://localhost:8080/ws/user?wsdl`

#### ②Web发布

配置依赖

~~~xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.version>4.0.5.RELEASE</spring.version>
        <cxf.version>3.0.0</cxf.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxws</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-transports-http</artifactId>
            <version>${cxf.version}</version>
        </dependency>
    </dependencies>
~~~

配置web.xml

~~~xml
 <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
 </listener>
 <context-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>
         classpath:spring.xml
     </param-value>
 </context-param>

 <servlet>
     <servlet-name>cxf</servlet-name>
     <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
 </servlet>
 <servlet-mapping>
     <servlet-name>cxf</servlet-name>
     <url-pattern>/*</url-pattern>
 </servlet-mapping>
~~~

发布

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:jaxws="http://cxf.apache.org/jaxws"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://cxf.apache.org/jaxws
       http://cxf.apache.org/schemas/jaxws.xsd">

    <context:component-scan base-package="top.rainynight.sitews.user.ws" />

    <!-- 下面的方法更简单
    <jaxws:server address="/ws/user">
        <jaxws:serviceBean>
            <ref bean="userWS"/>
        </jaxws:serviceBean>
    </jaxws:server>
    -->

    <jaxws:endpoint implementor="# userWS" address="/ws/user" />
</beans>
~~~

访问`http://localhost:8080/ws/user?wsdl`

### 调用服务

#### ①静态客户端

~~~java
public class JaxWsClient {

    public static void main(String[] args) {
        JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
        factory.setAddress("http://localhost:8080/ws/user");
        factory.setServiceClass(UserWS .class);

        UserWS userWS = factory.create(UserWS .class);
        User result = userWS .lookOver(1);
        System.out.println(result);
    }
}
~~~

#### ②动态代理客户端

~~~java
public class JaxWsDynamicClient {

    public static void main(String[] args) {
        JaxWsDynamicClientFactory factory = JaxWsDynamicClientFactory.newInstance();
        Client client = factory.createClient("http://localhost:8080/ws/user?wsdl");

        try {
            Object[] results = client.invoke("lookOver", 1);
            System.out.println(results[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
~~~

#### ③通用动态代理客户端

既可调用 JAX-WS 服务，也可调用 Simple 服务

~~~java
public class DynamicClient {

    public static void main(String[] args) {
        DynamicClientFactory factory = DynamicClientFactory.newInstance();
        Client client = factory.createClient("http://localhost:8080/ws/user?wsdl");

        try {
            Object[] results = client.invoke("lookOver", 1);
            System.out.println(results[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
~~~

#### ④Spring客户端

~~~xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:jaxws="http://cxf.apache.org/jaxws"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
       http://cxf.apache.org/jaxws
       http://cxf.apache.org/schemas/jaxws.xsd">

    <jaxws:client id="userWSClient"
                  serviceClass="top.rainynight.sitews.user.ws.UserWS"
                  address="http://localhost:8080/ws/user"/>

</beans>
~~~

~~~java
public class UserWSClient{

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring-client.xml");

        UserWS userWS= context.getBean("userWSClient", UserWS.class);
        User result = userWS.lookOver(1);
        System.out.println(result);
    }
}
~~~

## `2`.REST风格

### 定义接口

`!`REST 规范允许资源类没有接口

>请求方式注解，包括：`@GET、@POST、@PUT、@DELETE`
>
>请求路径注解，包括：`@Path` ，其中包括一个路径参数
>
>数据格式注解，包括：`@Consumes`（输入）、`@Produces`（输出），可使用 `MediaType` 常量
>
>相关参数注解，包括：`@PathParam`（路径参数）、`@FormParam`（表单参数），此外还有 `@QueryParam`（请求参数）

~~~java
package top.rainynight.sitews.user.ws;

import top.rainynight.sitews.user.entity.User;
import javax.jws.WebService;

@WebService
@Path("/")
public interface UserWS {

    @GET
    @Path("{id:[1-9]{1,9}}")
    @Produces(MediaType.APPLICATION_JSON)
    User lookOver(@PathParam("id") int id);
}
~~~

### 实现接口

~~~java
package top.rainynight.sitews.user.ws;

import top.rainynight.sitews.user.entity.User;
import org.springframework.stereotype.Component;

@Component("userWS")
public class UserWSImpl implements UserWS {

    @Override
    public User lookOver(int id) {
        return new User();
    }
}
~~~

### 发布服务

#### ①jetty发布

配置依赖

~~~xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <cxf.version>3.0.0</cxf.version>
    <jackson.version>2.4.1</jackson.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-rt-frontend-jaxrs</artifactId>
        <version>${cxf.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.cxf</groupId>
        <artifactId>cxf-rt-transports-http-jetty</artifactId>
        <version>${cxf.version}</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.jaxrs</groupId>
        <artifactId>jackson-jaxrs-json-provider</artifactId>
        <version>${jackson.version}</version>
    </dependency>
</dependencies>
~~~

发布

~~~java
public class Server {

    public static void main(String[] args) {
        // 添加 ResourceClass
        List<Class<?>> resourceClassList = new ArrayList<Class<?>>();
        resourceClassList.add(UserWSImpl .class);

        // 添加 ResourceProvider
        List<ResourceProvider> resourceProviderList = new ArrayList<ResourceProvider>();
        resourceProviderList.add(new SingletonResourceProvider(new ProductServiceImpl()));

        // 添加 Provider
        List<Object> providerList = new ArrayList<Object>();
        providerList.add(new JacksonJsonProvider());

        // 发布 REST 服务
        JAXRSServerFactoryBean factory = new JAXRSServerFactoryBean();
        factory.setAddress("http://localhost:8080/rs/user");
        factory.setResourceClasses(resourceClassList);
        factory.setResourceProviders(resourceProviderList);
        factory.setProviders(providerList);
        factory.create();
        System.out.println("rest ws is published");
    }
}
~~~

访问`http://localhost:8080/rs/user?_wadl`

#### ②web发布

配置依赖

~~~xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring.version>4.0.6.RELEASE</spring.version>
        <cxf.version>3.0.0</cxf.version>
        <jackson.version>2.4.1</jackson.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.cxf</groupId>
            <artifactId>cxf-rt-frontend-jaxrs</artifactId>
            <version>${cxf.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.jaxrs</groupId>
            <artifactId>jackson-jaxrs-json-provider</artifactId>
            <version>${jackson.version}</version>
        </dependency>
    </dependencies>
~~~

配置web.xml

~~~xml
 <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
 </listener>
 <context-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>
         classpath:spring.xml
     </param-value>
 </context-param>

 <servlet>
     <servlet-name>cxf</servlet-name>
     <servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
 </servlet>
 <servlet-mapping>
     <servlet-name>cxf</servlet-name>
     <url-pattern>/*</url-pattern>
 </servlet-mapping>
~~~

发布

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:jaxrs="http://cxf.apache.org/jaxrs"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://cxf.apache.org/jaxrs
       http://cxf.apache.org/schemas/jaxrs.xsd">

    <context:component-scan base-package="top.rainynight.sitews.user.ws" />

    <jaxrs:server address="/rs/user">
        <jaxrs:serviceBeans>
            <ref bean="userWS"/>
        </jaxrs:serviceBeans>
        <jaxrs:providers>
            <bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider"/>
        </jaxrs:providers>
    </jaxrs:server>
</beans>
~~~

访问`http://localhost:8080/rs/user?_wadl`

### 调用服务

#### ①JAX-RS 1.0 客户端

~~~java
public class JAXRSClient {

    public static void main(String[] args) {
        String baseAddress = "http://localhost:8080/rs/user";

        List<Object> providerList = new ArrayList<Object>();
        providerList.add(new JacksonJsonProvider());

        UserWS userWS = JAXRSClientFactory.create(baseAddress, UserWS.class, providerList);

    }
}
~~~

#### ②JAX-RS 2.0 客户端

~~~java
public class JAXRS20Client {

    public static void main(String[] args) {
        String baseAddress = "http://localhost:8080/rs/user";

        JacksonJsonProvider jsonProvider = new JacksonJsonProvider();

        List<User> userList = ClientBuilder.newClient()
            .register(jsonProvider)
            .target(baseAddress)
            .path("/1")
            .request(MediaType.APPLICATION_JSON)
            .get(new GenericType<List<User>>() {});
    }
}
~~~

#### ③WebClient 客户端

~~~java
public class CXFWebClient {

    public static void main(String[] args) {
        String baseAddress = "http://localhost:8080/rs/user";

        List<Object> providerList = new ArrayList<Object>();
        providerList.add(new JacksonJsonProvider());

        List<User> userList = WebClient.create(baseAddress, providerList)
            .path("/1")
            .accept(MediaType.APPLICATION_JSON)
            .get(new GenericType<List<User>>() {});

    }
}
~~~

#### ④AJAX客户端

~~~javascript
$.ajax({
  type: 'get',
  url: 'http://localhost:8080/rs/user/1',
  dataType: 'json',
  success: function(data) {
//...
  }
});
~~~

跨域方案1：jsonp

~~~xml
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-rt-rs-extension-providers</artifactId>
    <version>${cxf.version}</version>
</dependency>
~~~

~~~xml
<jaxrs:server address="/rs/user">
    <jaxrs:serviceBeans>
        <ref bean="userWS"/>
    </jaxrs:serviceBeans>
    <jaxrs:providers>
        <bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider"/>
        <bean class="org.apache.cxf.jaxrs.provider.jsonp.JsonpPreStreamInterceptor"/>
    </jaxrs:providers>
    <jaxrs:inInterceptors>
        <bean class="org.apache.cxf.jaxrs.provider.jsonp.JsonpInInterceptor"/>
    </jaxrs:inInterceptors>
    <jaxrs:outInterceptors>
        <bean class="org.apache.cxf.jaxrs.provider.jsonp.JsonpPostStreamInterceptor"/>
    </jaxrs:outInterceptors>
</jaxrs:server>
~~~

~~~javascript
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/rs/user/1',
    dataType: 'jsonp',
    jsonp: '_jsonp',
    jsonpCallback: 'callback',
    success: function(data) {
        //...
    }
});
~~~

跨域方案2：cors

~~~xml
<dependency>
    <groupId>org.apache.cxf</groupId>
    <artifactId>cxf-rt-rs-security-cors</artifactId>
    <version>${cxf.version}</version>
</dependency>
~~~

~~~xml
<jaxrs:server address="/rs/user">
    <jaxrs:serviceBeans>
        <ref bean="userWS"/>
    </jaxrs:serviceBeans>
    <jaxrs:providers>
        <bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider"/>
        <bean class="org.apache.cxf.rs.security.cors.CrossOriginResourceSharingFilter">
            <property name="allowOrigins" value="http://localhost"/>
        </bean>
    </jaxrs:providers>
</jaxrs:server>
~~~

allowOrigins 设置客户端域名

IE8 中使用 jQuery 发送 AJAX 请求时，需要配置 `$.support.cors = true`
















## `～～`警告`～～`
`!warning` 极重要，cxf在wsdl中发布的`targetNamespace`是实现类路径，而被调用时却只接受接口路径。所以，请将接口与实现类放在同一路径下，或者在实现类中指定`targetNamespace`为接口的路径；否则客户端将抛出 ..common.i18n.UncheckedException: No operation was found with the name ... 异常