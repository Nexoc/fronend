import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuex from 'vuex'


axios.defaults.baseURL = 'http://localhost:8001'

// axios.defaults.baseURL = 'http://localhost:8001/api/v1'

store.dispatch("token_storage")

const app = createApp(App)
app.use(store).use(router).use(Vuex).mount('#app')
