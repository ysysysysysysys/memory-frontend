import {upload} from '@network/mainRequest'
import router from '../router'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';


export function submitUpload(request,uploads,type,fileList) {
    const options = {
        text: '正在上传请稍等'
    }
    let loading = Loading.service(options)
    uploads.submit();
    if (!request.get('file')) {
        loading.close()
        Message.error('请选择图片')
    } else {
        request.append("type", type)
        upload(request)
            .then(res => {
                const r = res.data
                if (!r.success) {
                    //校验失败
                    if (r.code != null && r.code == '401') {
                        Message.error('登录失效请重新登录')
                        router.replace('/')
                    } else {
                        //上传失败
                        Message.error('上传服务器失败')
                    }
                } else {
                    Message.info('上传完成')
                    r.body.forEach(n =>{
                        fileList.push(n)
                    })
                }
                loading.close()
            })
            .catch(err => {
                Message.error('上传发生错误')
                console.log(err)
                loading.close()
            })
    }
}

export function uploads(request,file) {
    request.append("file", file.file)
    console.log(file);
}