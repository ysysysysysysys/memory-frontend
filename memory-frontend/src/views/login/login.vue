<template>
    <div class="content">
        <div class="imageContent">
            <img class="image" src="@assets/img/login/logo.png" alt=""/>
        </div>
        <div class="name">
            <span>记忆</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 133px">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="ruleForm.account" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="enter">登录</el-button>
                <el-button @click="regist">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {login} from "@network/userRequest";

    export default {
        name: "login",
        data(){
            return {
                ruleForm:{
                    account:this.$store.state.user.account,
                    password:this.$store.state.user.password,
                    token:""
                },
                rules:{
                    account: [{required:true,message:'请输入用户名',trigger:'blur'}],
                    password: [{required: true,message:'请输入密码',trigger: 'blur'}]
                }
            }
        },
        methods:{
            enter(){
                this.$refs.ruleForm.validate((valid =>{
                    if(valid){
                        login(this.ruleForm.account,this.ruleForm.password)
                            .then(res =>{
                                if(res.data.success){
                                    // token放入localstoreage
                                    this.ruleForm.token = res.data.body
                                    this.$store.dispatch('saveToken', this.ruleForm).then(res =>{
                                        //修改tabState
                                        this.$store.dispatch('changeTabState',true).then(res =>{
                                            this.$router.replace('/picture')
                                        })
                                    })
                                }else{
                                    this.$message.error(res.data.message)
                                }
                            })
                            .catch(res =>{
                                this.$message.error('系统异常')
                            })
                    }else{
                        return false
                    }
                }))
            },
            regist(){
                this.$router.push('/regist')
            }
        },

    }
</script>

<style scoped>
    .content {
        background-image: url("~@assets/img/background/top.jpg");
        background-size: cover;
        height: 100vh;
    }

    .image {
        width: 150px;
        height: 150px;

    }

    .imageContent {
        position: relative;
        text-align: center;
        padding-top: 20%;
    }

    .name {
        text-align: center;
        font-size: 27px;
        margin-bottom: 30%;
    }
    .input{
        text-align: center;
        margin-top: 70px;
    }

    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 80%;
    }
    .button{
        position: absolute;
        top: 552px;
        left: 83px;
    }

    .el-button.is-round {
        border-radius: 20px;
        padding: 15px 25px;
    }
</style>