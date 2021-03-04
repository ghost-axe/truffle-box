import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getWeb3 from '@/libs/getWeb3'

Vue.config.productionTip = false

getWeb3().then( async web3 => {
  Vue.prototype.$web3 = web3
  Vue.prototype.$accounts = await web3.eth.getAccounts()
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
