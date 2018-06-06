<template>
    <div>
        <p>page 1</p>
        <p>{{newauth}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //auth: this.$store.state.auths
            }
        },
        computed: {
            newauth () {
                return this.$store.state.auths;
            }
        }
    }
</script>

<style scoped>
    p {
        color: red;
    }
</style>