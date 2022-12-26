import Vue from 'vue'
import axios from "axios";
import VueAxios from 'vue-axios'
import {Message,Loading} from "element-ui";
Vue.use(VueAxios, axios)
//请求拦截器
axios.interceptors.request.use(config => {
    Loading.service(
        {text:"拼命加载中...", background: 'rgba(86,83,83,0.7)'});
    return config;
}, err => {
    Message.error({message: '请求超时!'})
})

//响应拦截器
axios.interceptors.response.use(success=>{
        Loading.service({text:"拼命加载中..."}).close();
        return success;
},err => {
    if (err.response.status === 500) {
        Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    }else {
        Message.error({message: '未知错误'});
    }
    return Promise.reject(err);
})
