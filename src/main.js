import Vue from 'vue'
import App from './App.vue'
import Buefy from "buefy"
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import store from './store'
import axios from "axios"
import FlashMessage from '@smartweb/vue-flash-message';
import VueMeta from 'vue-meta'

Vue.prototype.$http = axios
if (store.getters["auth/user"]) {
    Vue.prototype.$http.defaults.headers.common['btoken'] = store.getters["auth/user"].token
}
Vue.prototype.$http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        store.dispatch('auth/logout')
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

Vue.mixin({
    methods: {
        chunk_array: (arr, size) =>
            Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
                arr.slice(i * size, i * size + size)
            )
    },
})

Vue.use(Buefy)
Vue.use(VueMeta)
Vue.use(FlashMessage, {time: 4000})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
