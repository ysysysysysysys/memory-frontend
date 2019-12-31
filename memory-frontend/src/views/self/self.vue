<template>
    <div class="button-div">
        <button class="button" @click="out">退出登录</button>
    </div>
</template>

<script>
    export default {
        name: "self",
        mounted() {
            //修改tabState
            this.$store.dispatch('changeTabState',true)
        },
        methods:{
            out(){
                localStorage.clear()
                this.$store.dispatch('changeTabState',false).then(res =>{
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped>
    .button-div{
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
    }
    .button{
        font-size: 32px;
        background-color: rgba(195, 195, 199, 0.18);
        color: #dd4e55;
        margin-bottom: 7px;
    }
</style>