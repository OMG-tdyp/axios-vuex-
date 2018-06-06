<template>
    <div>
        <p>page 2</p>
        <div>
            <input type="text" v-model="auth">
            <br>
            <button @click="resetStore">重置vuex中的数据</button>
            <div>{{this.$store.state.auths}}</div>
        </div>
    </div>
</template>

<script>
    import { CHANGE } from '@/store';
    export default {
        data() {
            return {
                auth: '',
            }
        },
        methods: {
            resetStore () {
                this.$store.commit(CHANGE,this.auth);
            }
        }
    }
</script>

<style scoped>
    p {
        color: green;
    }
</style>