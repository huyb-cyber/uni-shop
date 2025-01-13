// vue.config.js
const path = require('path');
module.exports = {
    transpileDependencies: ['@dcloudio/uni-ui'],
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
}