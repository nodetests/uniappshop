import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store
Vue.prototype.$api =(url)=>{
	return `http://49.233.66.125:1234/${url}`
}
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
