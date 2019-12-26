<template>
    <div class="regist">
        <top-tab>
            <el-button slot="left" type="primary" icon="el-icon-back" @click="back" circle></el-button>
            <div slot="center" class="center-content">
                <p>基本信息</p>
                <img class="image" src="@assets/img/login/logo.png" alt=""/>
            </div>
        </top-tab>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="请输入账号" prop="account">
                <el-input v-model="ruleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="请输入姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="请输入手机号" prop="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="man">男</el-radio>
                    <el-radio label="woman">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="regist()">注册</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import topTab from "@components/topTab/topTab";

    import {checkAccountRequest, regist} from '@network/userRequest'


    import axios from 'axios'

    export default {
        name: "regist",
        components:{
            topTab
        },
        data() {
            let checkphone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'))
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确手机号'))
                    }
                }
            }
            let checkAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'))
                } else {
                    if (value.length >= 6 && value.length <= 12) {
                        checkAccountRequest(value)
                            .then(res => {
                                //如果没被注册过直接通过
                                if (!res.data.success) {
                                    callback()
                                } else {
                                    callback(new Error('该账号已存在'))
                                }
                            })
                            .catch(res => {
                                console.log('系统错误' + res);
                                this.$message.error('系统错误')
                            })
                    } else {
                        callback(new Error('账号必须是6-12位哦'))
                    }
                }
            }
            return {
                ruleForm: {
                    sex: "",
                    name: "",
                    account: "",
                    password: "",
                    phone: ""
                },
                rules: {
                    account: [{required: true, validator: checkAccount, trigger: 'blur'}],
                    password: [
                        {required: true, message: '请输入密码'},
                        {min: 6, max: 12, message: "密码必须是6-12位哦"}],
                    name: [{required: true, message: '请输入姓名'}],
                    phone: [{required: true, validator: checkphone},],
                    sex: [{required: true, message: '请选择性别'}]
                }
            }
        },
        methods: {
            regist() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        regist(this.ruleForm)
                            .then(res => {
                                if (res.data.success) {
                                    this.$message({
                                        showClose: true,
                                        message: '注册成功,3秒后跳转',
                                        type: 'success'
                                    })
                                    setTimeout(() => {
                                        this.$store.dispatch('saveUserInfo', this.ruleForm).then(res =>{
                                            this.$router.replace('/')
                                        })
                                    }, 3000)
                                } else {
                                    console.log('系统错误');
                                    this.$message.error('系统错误')
                                }
                            })
                            .catch(err => {
                                console.log('系统错误' + err);
                                this.$message.error('系统错误')
                            })
                    } else {
                        return false
                    }
                })
            },
            resetForm() {
                this.$refs.ruleForm.resetFields();
            },
            back() {
                this.$router.back()
            }
        }

    }
</script>

<style scoped>
    .backbutton {
        float: left;
    }

    .el-button.is-circle {
        border-radius: 50%;
        padding: 13px;
    }

    .toptext {
        font-size: 32px;
        left: 94px;
        position: relative;
    }
    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 90%;
    }
    .image{
        width: 150px;
        height: 150px;
        text-align: center;
    }
     .el-form-item>>>.el-form-item__label {
        text-align: left;
        vertical-align: middle;
        float: left;
        font-size: 10px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .center-content{
        margin-top: -24px;
        font-size: 25px;
    }
    .regist{
        background-image: url("~@assets/img/background/regist.jpg");
        background-size: cover;
        height: 100vh;
    }
</style>