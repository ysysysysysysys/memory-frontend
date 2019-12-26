import {mainBase} from './base'

export function upload(datas) {
    return mainBase({
        url: '/oss/upload',
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: datas
    })
}

export function getList(uploadRequest) {
    return mainBase({
        url: '/oss/getUploadList',
        method: 'POST',
        data: uploadRequest
    })
}

export function download(datas) {
    return mainBase({
        url:'/oss/download',
        method:'POST',
        data:datas
    })
}

export class UploadRequest {
    constructor(account, memoryType, year, pageNum, pageSize) {
        this.account = account;
        this.memoryType = memoryType;
        this.year = year;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    }
}