import Vue from 'vue'
import App from './dubbing'
import 'mint-ui/lib/style.css'
import AwesomePicker from 'vue-awesome-picker'
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)
Vue.use(AwesomePicker)
Vue.config.productionTip = false

const app = new Vue(App)
app.$mount()
