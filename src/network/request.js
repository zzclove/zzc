//回调函数success,failure
// import axios from 'axios'
// export  function request(config,success,failure){
//     const instance=axios.create({
//       baseURL:'http://152.136.185.210:7878/api/m5',
//       timeout:5000
//     })
//   //发送真正的网络请求
//   instance(config)
//       .then(res=>{
//         console.log(res);
//         success(res)
//       })
//       .catch(err=>{
//         console.log(err);
//         failure(err)
//       })
// }

//直接return
import axios from 'axios'
export  function request(config){
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  //axios拦截器
  //什么时候用拦截器
  //1.比如config中的一些信息不符合服务器的要求
  //2.比如每次发送网络请求时，都希望在页面中显示一个图标
  //3.某些网络请求(比如登录(token)),必须携带一些特殊信息
  //请求拦截器的作用
  //请求拦截
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config
  },error => {
    console.log(error);
  })
  //响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data
  },error => {
    console.log(error);
  })
  //发送真正的网络请求
   return instance(config)
}