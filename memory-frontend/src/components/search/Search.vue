<template>
    <div>
        <transition
                name="custom-classes-transition"
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX">
            <el-input v-model="input" placeholder="请输入年份" v-show="searchState" suffix-icon="el-icon-search"
                      @change="change"
                      maxlength="4"
                      type="number"
                      minlength="4"></el-input>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data(){
            return{
                input:null,
            }
        },
        props:{
            searchState:false
        },
        methods:{
            change(){
                if(this.input.length == 4){
                    this.$emit('change',this.input)
                }else{
                    this.$message.error('请输入正确年份')
                }
            }
        }

    }
</script>

<style scoped>

</style>