<template>
    <div>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="text" placeholder="请输入密码" v-model="password">
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import api from "../axios.js";
    import { LOGIN } from '@/store';
    export default {
        name: 'page1',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login () {
                let param = {
                    username: this.username,
                    username: this.username
                }
                api.userLogin(param).then(data => {
                    if(data.data.code === 200) {
                        this.$store.dispatch(LOGIN, data.data.results[0]);
                        //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                        let redirectUrl = decodeURIComponent( this.$route.query.redirect || '/' );
                        //跳转到指定的路由
                        this.$router.push({path: redirectUrl});
                    } else {
                        alert('登录错误');
                    }
                }) 
            }
        }
    }
</script>

<style scoped>

</style>