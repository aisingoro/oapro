// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'

import Aui from '../static/aui-m.js'
import '../static/theme-default/index.less'


Vue.config.productionTip = false

Vue.use(Aui)




// wx.checkJsApi({

//     jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,

//     success: function(res) {
// console.log(33);
//     	console.log(res.checkJsApi);

//         // 以键值对的形式返回，可用的api值true，不可用为false

//         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

//     }

// });





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
