---
layout: post
title: Bean Validation
tags: Bean Validation Java
categories: java
published: true
---

[BeanValidation][BeanValidation] 可以帮助开发者方便地对数据进行校验，但它只是一个标准，只有一套接口，要想使用它的功能必须选择一种实现，`hibernate-validator`是个不错的选择

~~~xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>5.0.2.Final</version>
</dependency>
~~~

BeanValidator 可以自动扫描到hibernate-validator，而不用进行任何配置，前提是需要将hibernate-validator放到classpath下

在JAVA类中可以直接得到可用的检验器实现：

~~~
private Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
~~~

它是怎么做到的？笔者和你具有一样强的好奇心，深入源码后，笔者发现了这样一段代码

~~~
private List<ValidationProvider<?>> loadProviders(ClassLoader classloader) {
	ServiceLoader<ValidationProvider> loader = ServiceLoader.load( ValidationProvider.class, classloader );
	Iterator<ValidationProvider> providerIterator = loader.iterator();
	List<ValidationProvider<?>> validationProviderList = new ArrayList<ValidationProvider<?>>();
	while ( providerIterator.hasNext() ) {
		try {
			validationProviderList.add( providerIterator.next() );
		}
		catch ( ServiceConfigurationError e ) {
			// ignore, because it can happen when multiple
			// providers are present and some of them are not class loader
			// compatible with our API.
		}
	}
	return validationProviderList;
}
~~~

显而易见，通过`ClassLoader`可以找出所有实现了`ValidationProvider`的接口的类，这些类即为BeanValidator的实现，然后从这个列表中取第一个就行了。

BeanValidation 使用方法也非常简单，调用`validate`方法后会返回一个校验结果集，如果结果集长度为0则表示校验完全通过；否则将可以从`ConstraintViolation`中获取失败信息

~~~
Set<ConstraintViolation<Article>> constraintViolations = validator.validate(new Article());
~~~

当然，前提是先要定义字段的约束，`@NotNull`表示此字段的值不可为空，注解也可以在字段上，更多预置的注解在`javax.validation.constraints`包中

~~~
@NotNull
public String getTitle() {
    return title;
}
~~~

#  与Spring集成

现在Spring4已经集成了BeanValidation，并增加了国际化支持，这个LocalValidatorFactoryBean可以注入到任何类中使用

~~~
<bean id="validator" class="org.springframework.validation.beanvalidation.LocalValidatorFactoryBean">
    <property name="providerClass" value="org.hibernate.validator.HibernateValidator"/>
    <!-- 如果不加默认到 使用classpath下的 ValidationMessages.properties -->
    <property name="validationMessageSource" ref="validationMessageSource"/>
</bean>

<!-- 国际化的消息资源文件（本系统中主要用于显示/错误消息定制） -->
<bean id="validationMessageSource" class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
    <property name="basenames">
        <list>
            <!-- 在web环境中一定要定位到classpath 否则默认到当前web应用下找  -->
            <value>classpath:messages/validationMessages</value>
            <value>classpath:org/hibernate/validator/ValidationMessages</value>
        </list>
    </property>
    <property name="useCodeAsDefaultMessage" value="false"/>
    <property name="defaultEncoding" value="UTF-8"/>
    <property name="cacheSeconds" value="60"/>
</bean>
~~~

如果你正在使用 SpringMVC 集成就更简单了

~~~
<mvc:annotation-driven validator="validator"/>
~~~

然后在需要校验的Bean上注解`@Valid`，并紧随其后添加`BindingResult`

~~~
@RequestMapping(value = "release", method = RequestMethod.POST)
public String release(@Valid Article article, BindingResult bindingResult, HttpSession session, ModelMap modelMap){
 ...
 ...
}
~~~

如果想要将校验失败的信息展示在页面上可以使用el表达式, 注意el版本必须在2.2以上, s前缀指的是spring标签

~~~
<%@taglib prefix="s" uri="http://www.springframework.org/tags" %>
~~~

~~~
<s:hasBindErrors name="article">
    <c:if test="${errors.fieldErrorCount > 0}">
        字段错误：<br/>
        <c:forEach items="${errors.fieldErrors}" var="error">
            <s:message var="message" code="${error.code}" arguments="${error.arguments}" text="${error.defaultMessage}"/>
            ${error.field}------${message}<br/>
        </c:forEach>
    </c:if>

    <c:if test="${errors.globalErrorCount > 0}">
        全局错误：<br/>
        <c:forEach items="${errors.globalErrors}" var="error">
            <s:message var="message" code="${error.code}" arguments="${error.arguments}" text="${error.defaultMessage}"/>
            <c:if test="${not empty message}">
                ${message}<br/>
            </c:if>
        </c:forEach>
    </c:if>
</s:hasBindErrors>
~~~

---

其实 BeanValidation的内容远不止于此，它还有很多更高级的特性，如分组校验等，详情请[点我][more]



[BeanValidation]:http://beanvalidation.org/
[more]:http://www.ibm.com/developerworks/cn/java/j-lo-beanvalid/