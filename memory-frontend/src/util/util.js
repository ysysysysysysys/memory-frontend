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