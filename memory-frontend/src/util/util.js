import {download, downloadRequest} from "@network/mainRequest";
import store from '../store'
import { Loading } from 'element-ui';


export function debounce(func,wait){
    let time = 0
    return function (...args) {
        if(time){
            clearTimeout(time)
        }
        time = setTimeout(() =>{
            func.apply(this,args)
        },wait)
    }
}

export function postDownLoadFile(data, fileName) {
    var blob = new Blob([data], { type: 'application/octet-stream;charset=utf-8' }); // 指定格式为vnd.ms-excel
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); // 创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.zip`; // 下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); // 点击下载
    document.body.removeChild(downloadElement); // 下载完成移除元素
    window.URL.revokeObjectURL(href); // 释放掉blob对象
}

export function downloads(names,type) {
    const options = {
        spinner: 'el-icon-loading',
        text: '正在下载请稍后'
    }
    const loading = Loading.service(options)
    let datas = []
    names.forEach(n => {
        let request = new downloadRequest(n, store.state.user.account, type);
        datas.push(request)
    })
    console.log(datas);

    download(datas)
        .then(res => {
            console.log(res);
            if (res.status == 200 && res.data != null && res.data.length != 0) {
                let date = new Date();
                postDownLoadFile(res.data, type + date.toLocaleString())
                //修改chooseState
                loading.close()
            }
        })
        .catch(err => {
            console.log(err);
        })

}