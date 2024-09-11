import './assets/main.css'
import './assets/common.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.mount('#app')

export default app
