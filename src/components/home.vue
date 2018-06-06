<template>
    <div>
        <h2>这是主页面</h2>
        <router-link to="/page1">去往page1页面</router-link>
        <router-link to="/page2">去往page2页面</router-link>
        <br>
        <button @click="logout">登出系统</button>
        <router-view></router-view>
    </div>
</template>

<script>
    import { LOGOUT } from '@/store';
    export default {
        methods: {
            logout () {
                this.$store.dispatch(LOGOUT);
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>