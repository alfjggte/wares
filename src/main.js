import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
Vue.prototype.$axios = Axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import '../api/mock'
// 判断token
router.beforeEach((to, _, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (token && to.name == 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
  render: h => h(App)
}).$mount('#app')
