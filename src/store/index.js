import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// mutation types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const CHANGE = 'CHANGE'

//创建基本状态
const state = {
    isLogin: window.sessionStorage.getItem('token'),
    auths: '',
}
//创建改变状态的方法
const mutations = {
    [LOGIN] (state,data) {
        state.auths = data.user;
        state.isLogin = data.token;
        window.sessionStorage.setItem('token',data.token);
    },
    [LOGOUT] (state,data) {
        state.auths = '';
        state.isLogin = null;
        window.sessionStorage.removeItem('token');
    },
    [CHANGE] (state,data) {
        state.auths = data;
    }
}
//创建驱动actions可以使用mutations得以启动
const actions = {
    [LOGIN] ({commit},data) {
        commit(LOGIN,data);
    },
    [LOGOUT] ({commit}) {
        commit(LOGOUT)
    },
    [CHANGE] ({commit}) {
        commit(CHANGE)
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations
});