import axios from 'axios'
import router from '../router'
import store from '../store'
import {Message} from 'element-ui';

export function userBase(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8085',
        timeout: 10000,
        headers: {'Access-Control-Allow-Origin': '*'}
    })

    instance.interceptors.request.use(config => {
        return config
    }, error => {

    })

    instance.interceptors.response.use(res => {
        return res
    }, error => {
        console.log(error);
    })

    return instance(config);
}

export function mainBase(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8085',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'token': localStorage.getItem('token'),
            'account': localStorage.getItem('account')
        }
    })
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        console.log(error);
    })

    instance.interceptors.response.use(res => {
        console.log(res);
        if (res.data.state == 'false' && res.data.success == '401') {
            //修改tabState
            store.dispatch('changeTabState', false)
                .then(res => {
                    Message.info("登录失效,请重新登录")
                    router.replace('/')
                }).catch(err => {
                console.log(err);
            })
        } else {
            return res
        }
    }, error => {
        console.log(error);
    })

    return instance(config);
}