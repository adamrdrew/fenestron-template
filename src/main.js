import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FenestronUI from 'fenestron-ui'
import electron from 'electron'

Vue.config.productionTip = false

store.state.theme.accentColor = electron.remote.systemPreferences.getAccentColor()
store.state.theme.isDarkMode = electron.remote.systemPreferences.isDarkMode()

Vue.use(FenestronUI, {
  darkMode: store.state.theme.isDarkMode
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
