//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//start:进度条开始，done：进度条结束

//1:利用axios对象上create方法创建一个axios实例
//2:request就是axios，只不过可以稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径,每次发请求时会带上/api前缀
    baseURL:'/api',
    //请求超时时间
    timeout:5000
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象，里面有一个属性很重要，headers请求头
    //启动进度条
    nprogress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //关闭进度条
    nprogress.done()
    return res.data
},(err)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default requests