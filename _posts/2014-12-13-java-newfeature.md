---
layout: post
title: Java8 新特性
tags: Java 新特性
categories: Java
---

* TOC
{:toc}


# `1` 语言新特性

## `1.1` Lambda

自动推测形参类型`e`

~~~ java
Arrays.asList( "a", "b", "d" ).forEach( e -> System.out.println( e ) );
~~~
指定形参类型`e`

~~~ java
Arrays.asList( "a", "b", "d" ).forEach( ( String e ) -> System.out.println( e ) );
~~~
方法体可以用`{}`包裹

~~~ java
Arrays.asList( "a", "b", "d" ).forEach( e -> {
    System.out.print( e );
    System.out.print( e );
} );
~~~

**effectively final**，lambda引用的对象会自动转为final

~~~java
String separator = ",";
Arrays.asList( "a", "b", "d" ).forEach( 
    ( String e ) -> System.out.print( e + separator ) );
~~~

## `1.2` FunctionalInterface

函数接口就是只具有一个方法的普通接口，这样的接口，可以被隐式转换为lambda表达式，

然而，一旦在此接口中增加了方法，它将不再是函数接口，使用lambda时也将编译失败。

`@FunctionalInterface`注解可以约束接口的行为，**默认方法**与**静态方法**不会影响函数接口

~~~java
@FunctionalInterface
public interface Functional {
    void method();
}
~~~

## `1.3` 接口默认方法

~~~java
public interface Defaulable {
    // Interfaces now allow default methods, the implementer may or 
    // may not implement (override) them.
    default String notRequired() { 
        return "Default implementation"; 
    }        
}

public  class DefaultableImpl implements Defaulable {
}
     
public  class OverridableImpl implements Defaulable {
    @Override
    public String notRequired() {
        return "Overridden implementation";
    }
}
~~~

## `1.4` 接口静态方法

~~~java
private interface DefaulableFactory {
    // Interfaces now allow static methods
    static Defaulable create( Supplier< Defaulable > supplier ) {
        return supplier.get();
    }
}
~~~

## `1.5` 方法引用

可以将类中既有 方法引用为lambda

~~~java
public static class Car {

    public static Car create( final Supplier< Car > supplier ) {
        return supplier.get();
    }              
         
    public static void collide( final Car car ) {
        System.out.println( "Collided " + car.toString() );
    }
              
    public void repair() {   
        System.out.println( "Repaired " + this.toString() );
    }    
    
    public void follow( final Car another ) {
        System.out.println( "Following the " + another.toString() );
    }

}
~~~

①构造器引用，语法为 `Class::new`，效果如同 `() -> new Class()`

~~~java
Car car = Car.create( Car::new );
final List< Car > cars = Arrays.asList( car );
~~~

②静态方法引用，语法为 `Class::static_method`，效果如同 `p -> Class.static_method(p)`

~~~java
cars.forEach( Car::collide );
~~~

③实例**无参**方法引用，语法为 `Class::method`，效果如同 `p -> p.method()`，该方法没有参数

~~~java
cars.forEach( Car::repair );
~~~

④实例**有参**方法引用，语法为 `instance::method` ，效果如同 `p -> instance.method(p)`

~~~java
final Car police = Car.create( Car::new );
cars.forEach( police::follow );
~~~

⑤其他

~~~java
   super::methName //引用某个对象的父类方法
   TypeName[]::new //引用一个数组的构造器
~~~

## `1.6` 重复注解

相同的注解可以在同一地方声明多次，由 `@Repeatable` 提供此特性

~~~java
/**
 * @Repeatable( Filters.class )
 * 表示该注解可重复使用，注解内容存放于Filters中
 */
@Target( ElementType.TYPE )
@Retention( RetentionPolicy.RUNTIME )
@Repeatable( Filters.class )
public @interface Filter {
    String value();
};

/**
 * 存放@Filter注解的数组
 * 该注解必须可以被访问
 */
@Target( ElementType.TYPE )
@Retention( RetentionPolicy.RUNTIME )
public @interface Filters {
    Filter[] value();
}

/**
 * 测试
 */
@Filter( "filter1" )
@Filter( "filter2" )
public interface Filterable {
}

public static void main(String[] args) {
    //java8 提供的新方法，用于获取重复的注解
    for(Filter filter : Filterable.class.getAnnotationsByType(Filter.class ) ) {
        System.out.println( filter.value() );
    }
}
~~~

## `1.7` 类型推测

~~~java
public class TypeInfer {
    public static void main(String[] args) {

        final Value< String > value = new Value<>();

        //value.setV(Value.<String>defV()); //以前的写法

        //Value.defV()返回类型被推测为String
        value.setV(Value.defV());
        System.out.println(value.getV());
    }
}

class Value< T > {

    private T o;

    public static <T>  T defV() {
        //若T不为Object,将会出现类型转换异常
        return (T)new Object();
    }

    public void setV(T o){
        this.o = o;
    }

    public T getV(){
        return o;
    }
}
~~~

## `1.8` 扩展注解

java8几乎可以为任何东西添加注解：局部变量、泛型类、父类与接口的实现以及方法异常

`ElementType.TYPE_USE`和`ElementType.TYPE_PARAMETER` 用于描述注解上下文

~~~java
public class AnnotationEX {
    
    @Retention( RetentionPolicy.RUNTIME )
    @Target( { ElementType.TYPE_USE, ElementType.TYPE_PARAMETER } )
    public @interface Anno {
    }

    public static class TestAEX< @Anno T > extends @Anno Object {
        public void method() throws @Anno Exception {
        }

    }

    public static void main(String[] args) {
        final TestAEX< String > holder = new @Anno TestAEX<>();
        @Anno Collection< @Anno String > strings = new ArrayList<>();
    }
}
~~~

# `2` 类库新特性

## `2.1` Optional

~~~java
//将String对象装入Optional容器
Optional< String > stringOptional = Optional.ofNullable( null );

//判断容器中的String对象是否不为空
System.out.println(stringOptional.isPresent() );

//orElseGet通过lambda产生一个默认值
System.out.println(stringOptional.orElseGet( () -> "[default string]" ) );

//map对String对象进行转化，然后返回一个新的Optional实例，
// 此处s为null，所以未转换直接返回了1个新Optional实例，
// orElse直接产生一个默认值
System.out.println(stringOptional.map( p -> "[" + p + "]" ).orElse( "Hello Optional" ) );
~~~

## `2.2` Stream

stream操作被分成了**中间操作**与**最终操作**两种

**中间操作**返回一个新的stream对象。中间操作总是采用惰性求值方式，运行一个像filter这样的中间操作实际上没有进行任何过滤，相反它在遍历元素时会产生了一个新的stream对象，这个新的stream对象包含原始stream中符合给定谓词的所有元素。

**最终操作**可能直接遍历stream，产生一个结果或副作用，如forEach、sum等。当最终操作执行结束之后，stream管道被认为已经被消耗了，没有可能再被使用了。在大多数情况下，最终操作都是采用及早求值方式，及早完成底层数据源的遍历。

~~~java
public enum Status {
    OPEN, CLOSED
};

public class Task {
    private final Status status;
    private final Integer points;

    Task( final Status status, final Integer points ) {
        this.status = status;
        this.points = points;
    }

    public Integer getPoints() {
        return points;
    }

    public Status getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return String.format( "[%s, %d]", status, points );
    }
}

~~~

~~~java
public static void main(String[] args){
    Collection< Task > tasks = Arrays.asList(
            new Task( Status.OPEN, 5 ),
            new Task( Status.OPEN, 13 ),
            new Task( Status.CLOSED, 8 )
    );

    long totalPointsOfOpenTasks = tasks
            .stream()
            .filter( task -> task.getStatus() == Status.OPEN )
            .mapToInt( Task::getPoints )
            .sum();

    System.out.println( "Total points: " + totalPointsOfOpenTasks );
}
~~~

原生并行处理

~~~java
double totalPoints = tasks
   .stream()
   .parallel()
   .map( task -> task.getPoints() ) // or map( Task::getPoints ) 
   .reduce( 0, Integer::sum );    
   
System.out.println( "Total points (all tasks): " + totalPoints );
~~~

分组

~~~java
final Map< Status, List< Task >> map = tasks
        .stream()
        .collect( Collectors.groupingBy(Task::getStatus) );

System.out.println( map );
~~~

权重

~~~java
//计算权重
final Collection< String > result = tasks
        .stream()                                        // Stream< String >
        .mapToInt( Task::getPoints )                     // IntStream
        .asLongStream()                                  // LongStream
        .mapToDouble( points -> points / totalPoints )   // DoubleStream
        .boxed()                                         // Stream< Double >
        .mapToLong( weigth -> ( long )( weigth * 100 ) ) // LongStream
        .mapToObj( percentage -> percentage + "%" )      // Stream< String>
        .collect( Collectors.toList() );                 // List< String >

System.out.println( result );
~~~

## `2.3` Date/Time API

时间格式均为 **ISO-8601**

`Clock`

~~~java
//日期时间都有，有时区
Clock clock = Clock.systemUTC();
System.out.println(clock.instant());
System.out.println(clock.millis());
~~~

`LocalDate`

~~~java
//只有日期没有时间
LocalDate localDate = LocalDate.now();
LocalDate localDateFromClock = LocalDate.now(clock);
System.out.println(localDate);
System.out.println(localDateFromClock);
~~~

`LocalTime`

~~~java
//只有时间没有日期
LocalTime localTime = LocalTime.now();
LocalTime localTimeFromClock = LocalTime.now(clock);
System.out.println(localTime);
System.out.println(localTimeFromClock);
~~~

`LocalDateTime `

~~~java
//日期时间都有，没有时区
LocalDateTime localDateTime = LocalDateTime.now();
LocalDateTime localDateTimeFromClock = LocalDateTime.now(clock);
System.out.println(localDateTime);
System.out.println(localDateTimeFromClock);
~~~

`ZonedDateTime`

~~~java
//指定时区，只有ZonedDateTime，没有ZoneDate与ZoneTime
ZonedDateTime zonedDateTime = ZonedDateTime.now();
ZonedDateTime zonedDateTimeFromClock = ZonedDateTime.now();
ZonedDateTime zonedDateTimeFromZone = ZonedDateTime.now(ZoneId.of( "America/Los_Angeles" ));
System.out.println(zonedDateTime);
System.out.println(zonedDateTimeFromClock);
System.out.println(zonedDateTimeFromZone);
~~~

`Duration`

~~~java
//计算时间差
LocalDateTime from = LocalDateTime.of( 2014, Month.APRIL, 16, 0, 0, 0 );
LocalDateTime to = LocalDateTime.of( 2015, Month.APRIL, 16, 23, 59, 59 );
Duration duration = Duration.between( from, to );
System.out.println( "Duration in days: " + duration.toDays() );
System.out.println( "Duration in hours: " + duration.toHours() );
~~~

## `2.4` Nashorn

`javax.script.ScriptEngine`的另一种实现，允许js与java相互调用

~~~java
ScriptEngineManager manager = new ScriptEngineManager();
ScriptEngine engine = manager.getEngineByName( "JavaScript" );
         
System.out.println( engine.getClass().getName() );
System.out.println( "Result:" + engine.eval( "function f() { return 1; }; f() + 1;" ) );
~~~

## `2.5` Base64

Base64编码已经成为Java8类库的标准

~~~java
final String text = "Base64 finally in Java 8!";

final String encoded = Base64
        .getEncoder()
        .encodeToString( text.getBytes(StandardCharsets.UTF_8 ) );
System.out.println( encoded );

final String decoded = new String(
        Base64.getDecoder().decode( encoded ),
        StandardCharsets.UTF_8 );
System.out.println( decoded );
~~~

>其他编码器与解码器
>
>`Base64.getUrlEncoder() Base64.getUrlDecoder()`
>
>`Base64.getMimeEncoder() Base64.getMimeDecoder()`

## `2.6` 并行（parallel ）数组

**并行数组**操作可以在多核机器上极大提高性能

~~~java
long[] arrayOfLong = new long [ 20000 ];

//对arrayLong所有元素随机赋值
Arrays.parallelSetAll(arrayOfLong,
        index -> ThreadLocalRandom.current().nextInt(1000000));

//打印前10个元素
Arrays.stream( arrayOfLong ).limit( 10 ).forEach(
        i -> System.out.print( i + " " ) );
System.out.println();

//对arrayLong数组排序
Arrays.parallelSort( arrayOfLong );

//打印前10个元素
Arrays.stream( arrayOfLong ).limit( 10 ).forEach(
        i -> System.out.print( i + " " ) );
System.out.println();
~~~

## `2.7` 并发（concurrency）

* java.util.concurrent.`ConcurrentHashMap`类中加入了一些新方法来支持聚集操作

* java.util.concurrent.`ForkJoinPool`类中加入了一些新方法来支持共有资源池（common pool）

* java.util.concurrent.locks.`StampedLock`类提供基于容量的锁，这种锁有三个模型来控制读写操作

* java.util.concurrent.atomic包中增加新类：<br/>
`DoubleAccumulator`，<br/>
`DoubleAdder`，<br/>
`LongAccumulator`，<br/>
`LongAdder`


# `3` 编译器新特性

## `3.1` 参数名

方法参数的名字保留在Java字节码中，并且能够在运行时获取它们

编译时需要加上 `–parameters` ，**maven-compiler-plugin** 可进行配置

~~~java
public class ParameterNames {
    public static void main(String[] args) throws Exception {
        Method method = ParameterNames.class.getMethod( "main", String[].class );
        for( final Parameter parameter: method.getParameters() ) {
            System.out.println( "Parameter: " + parameter.getName() );
        }
    }
}
~~~

# `4` 新的Java工具

## `4.1` Nashorn引擎 `jjs`

它接受一些JavaScript源代码为参数，并且执行这些源代码

创建 **func.js** 文件

~~~javascript
function f() { 
     return 1; 
}; 
 
print( f() + 1 );
~~~
~~~bash
jjs func.js
~~~

## `4.2` 类依赖分析器 `jdeps`

它可以显示Java类的包级别或类级别的依赖，它接受一个.class文件，一个目录，或者一个jar文件作为输入。jdeps默认把结果输出到系统输出（控制台）上。

~~~bash
jdeps org.springframework.core-3.0.5.RELEASE.jar
~~~

如果依赖不在classpath中，就会显示 **not found**

# `5` JVM新特性

**PermGen**空间被移除了，取而代之的是**Metaspace**（JEP 122）。JVM选项**-XX:PermSize**与**-XX:MaxPermSize**分别被**-XX:MetaSpaceSize**与**-XX:MaxMetaspaceSize**所代替