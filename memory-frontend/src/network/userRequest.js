import {userBase} from './base'
import qs from 'qs'

export function checkAccountRequest(account) {
    return userBase({
        url: '/user/checkAccount',
        method:'POST',
        data:{
            account
        }
    })
}

export function login(account,password) {
    const datajob = {
        account,
        password
    }
    return userBase({
        url:'/user/login',
        method:'POST',
        data:datajob,
    })
}

export function regist(userinfo) {
    return userBase({
        url:'/user/regist',
        method:'post',
        data:userinfo
    })
}

export class UserInfo{
    constructor(radio,userName,account,password,phone){
        this.radio=radio;
        this.userName=userName,
        this.account=account,
        this.password=password,
        this.phone=phone
    }
}