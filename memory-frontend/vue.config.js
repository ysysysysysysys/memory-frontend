const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@network', resolve('src/network'))
            .set('@common', resolve('src/common'))
            .set('@util',resolve('src/util'))
    },
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        port: '8066'   // 指定打开浏览器的端口号
    }
}