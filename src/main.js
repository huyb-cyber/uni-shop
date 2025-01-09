import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import { $http } from '@escook/request-miniprogram'

Vue.config.productionTip = false

uni.$http = $http;

$http.beforeRequest = function (options) {

  uni.showLoading({
    title: '加载中',
    mask: true
  })
}

$http.afterRequest = function () {

  uni.hideLoading();
}

$http.baseUrl = 'https://api-hmugo-web.itheima.net'

uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {

  uni.showToast({

    title,
    duration,
    icon: 'none'
  })
}

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
