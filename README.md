# day1

1: vue-cli脚手架初始化项目

node + webpack + 淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候会原封不动打包到dist文件夹中。

src文件夹（程序员源代码文件夹）：
    assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包到js文件里面。

    components文件夹：一般放置的是非路由组件（全局组件）

    app.vue:唯一的根组件，Vue当中的组件（.vue）

    main.js:程序的入口文件,也是整个程序中最先执行的文件

babel.config.js:配置文件（babel相关）

package.json:项目信息

package-lock.json:缓存性文件

README.md:说明性文件

2: 项目的其他配置

2.1 项目运行起来的时候，浏览器自动打开
---package.json
    "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
    }

2.2 eslint校验功能关闭
---在根目录下创建一个vue.config.js文件

2.3 src文件夹目录的简写方式，配置别名
---在根目录下创建一个jsconfig.json文件，配置别名@提示
{
    "compilerOptions":{
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "exclude": ["node_modules", "dist"]
}

3:项目路由的分析
vue-router
前端所谓的路由：KV键值对。
key：URL（地址栏中的路径）
value：相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search路由组件、Login路由组件、Register注册路由组件
非路由组件：
Header【所有页面都有】
Footer【首页、搜索】，但在登录|注册页面没有

4：完成非路由组件Header与Footer业务
在开发项目的时候：
    1：书写静态页面（HTML+CSS）
    2：拆分组件
    3：获取服务器的数据动态展示
    4：完成相应的动态业务逻辑

    注意1：创建组件的时候，组件结构 + 组件样式 + 图片资源

    注意2：项目采用的less样式，浏览器不识别less样式，需要通过less、less-loader【安装5版本的】进行处理less

    注意3：如果想让组件识别less，需要在组件的style标签上添加lang="less"

4.1 使用组件的步骤（非路由组件）
-创建或者定义
-引入
-注册
-使用

5: 完成路由组件的搭建
vue-router
在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register
-components文件夹：经常放置的是非路由组件（共用全局组件）
-pages|views文件夹：放置路由组件

5.1 配置路由
项目中配置的路由一般放置在router文件夹中

5.2 总结
路由组件与非路由组件的区别？
1:路由组件一般放置在pages|views文件夹中，非路由组件一般放置在components文件夹中

2:路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用

3:注册完路由，不管是路由组件、还是非路由组件，身上都有$route、$router属性

$route: 一般获取路由信息【路径、query、params等等】
$router: 一般进行编程式导航进行路由跳转【push|replace】

5.3 路由的跳转？
路由的跳转有两种型式：
声明式导航router-link,可以进行路由跳转
编程式导航push|replace,可以进行路由跳转

编程式导航：声明式导航能做的，编程式导航都能做
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑

6: Footer组件显示与隐藏
显示或隐藏组件：v-if|v-show
Footer组件：在Home、Search组件中显示
Footer组件：在Login、Register组件中隐藏

6.1 我们可以根据组件身上的$route获取当前路由的信息，通过路径判断显示|隐藏

6.2 配置路由的时候，可以给路由添加路由元信息【meta】,路由需要配置对象，key不能瞎写

7:路由传参
7.1：路由跳转有几种方式？
比如：A -> B
声明式导航：router-link（务必要有to属性），可以实现路由跳转
编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由跳转

7.2：路由传参，参数有几种写法？
params参数：属于路径当中的一部分，在配置路由的时候,需要占位
query参数：不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&k=V,不需要占位

8: 路由传参相关面试题
    1.路由传递参数（对象写法）path是否可以结合params参数一起使用？

    2.如何指定params参数可传可不传？
    路径会出问题，就比如：
    http://localhost:8080/#/?k=ABC
    http://localhost:8080/#/search?k=ABC
    
    3.params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
    
    4.路由组件能不能传递props数据

# day2

1:编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理了

1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误呢？
"vue-router":"^3.5.3",最新的vue-router引入promise

1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前的错误
this.$router.push({name:'search',params:{'keyword':this.keyword},query:{'k':this.keyword.toUpperCase()}},()=>{},()=>{})
这种写法：治标不治本，将来在别的组件中push|replace，编程导航还是有类似错误

1.3
    this：当前组件实例
    this.$router属性：属性值是VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加的$router|$route属性

2:Home组件拆分

3:三级联动组件完成
---由于三级联动，在Home、Search、Detail组件中都复用了，注册成全局组件
好处：只需要注册一次，就可以在项目任意地方使用

4:完成其余静态组件
HTML + CSS + 图片资源 --

5:POSTMAN测试接口
---返回字段为200，代表成功
---所有接口都要/api前缀

6:axios二次封装
XMLHttpRequest、fetch、JQ、axios

6.1为什么需要进行二次封装axios？
请求拦截器：在发请求之前可以处理一些业务
响应拦截器：当服务器返回数据后，可以处理一些事情

6.2项目中经常会存在API文件夹【axios】
接口当中：路径都带有/api
baseUrl:'/api'
<http://xxx.xxxx:8080/api>

7:接口的统一管理

7.1跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域
<http://localhost:8080/#/home> --- 前端项目本地服务器
<http://39.98.123.211>         --- 后台服务器

JSONP、CROS、代理

8:nprogress进度条的使用

start:进度条开始
done:进度条结束
记得引入css样式

9:vuex状态管理库

9.1vuex是什么？

vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据

state：仓库存储数据的地方
actions：处理action，可以书写业务逻辑和处理异步
mutations：修改仓库的唯一手段
getters：可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
modules

9.2vuex基本使用

9.3vuex模块式开发

10:完成动态三级联动目录

# day3

1:实现一级分类动态添加背景颜色
第一种解决方案：使用样式完成（可以的）
第二种解决方案：使用js完成

2:实现js控制三级菜单显示与隐藏

3:节流与防抖
正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短并且回调函数内部有计算，那么很可能出现浏览器卡顿）

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
function throttle(fn, delay) {
    let timer = null
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn()
                timer = null
            }, delay)
        }
    }
}

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间后才会触发，也就是说如果连续快速的触发，只会执行一次
function debounce(fn, delay){
    let timer = null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}

4:实现三级联动节流操作
