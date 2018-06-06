import axios from 'axios'
import store from './store'
import router from './router'
import { LOGIN,LOGOUT } from '@/store'

//设置全局axios拦截器
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//创建一个axios实例
const instance = axios.create();
const _baseUrl = '/';
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use = instance.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
    config => {
        //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
        if(store.state.isLogin) {
            config.headers.Authorization = store.state.isLogin;
        }
        //这里可以进行全局ajax请求开始动画，比如iView.LoadingBar.start()
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//response拦截器
instance.interceptors.response.use(
    response => {
        //这里可以进行全局ajax请求结束动画，比如iView.LoadingBar.finish()
        return response;
    },
    err => {
        if(error.response.status === 401) { //401表示权限不够
            store.dispatch(LOGOUT); //可能是token过期，清除它
            router.replace({ 
                path: 'login', //跳转到登录页面
                query: {redirect: router.currentRoute.fullPath}  //将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        } else {
            //这里可以进行全局ajax请求错误处理，比如
            // iView.Modal.error({
            //     title: '错误',
            //     content: `<div><p>服务器错误</p></div>`,
            //     maskClosable: false,          
            // });
        }
        return Promise.reject(err.response);
    }    
);

//统一暴露调用接口，所有请求都写在这里，外部只要调用相应方法
export default {
    getBaseUrl() {
        return _baseUrl;
    },
    //用户登录
    userLogin(data) {
        return instance.get(_baseUrl + 'static/login.json', data);
    },
}