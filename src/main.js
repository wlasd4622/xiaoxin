import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$fly = fly;
const app = new Vue(App)
app.$mount()
