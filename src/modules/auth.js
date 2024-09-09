import Vue from 'vue'
import router from "@/router";

export default {
    namespaced: true,
    state: {
        user: localStorage.getItem('betexyuser')
    },
    actions: {
        login({commit}, payload) {
            return Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'auth/login', {user: payload})
                .then((resp) => {
                    let user = resp.data.result
                    commit('user', user)
                    Vue.prototype.$http.defaults.headers.common['btoken'] = user.token
                })
        },
        confirmation({commit}, payload) {
            return Vue.prototype.$http.post(process.env.VUE_APP_API_HOST + 'auth/confirmation', {user: payload})
                .then((resp) => {
                    let user = resp.data.result
                    commit('user', user)
                    Vue.prototype.$http.defaults.headers.common['btoken'] = user.token
                })
        },
        logout({commit}, redirect = true) {
            delete Vue.prototype.$http.defaults.headers.common['btoken']
            commit('user', null)
            if (redirect) {
                router.push('/login');
            }
        },
        refresh({commit, getters}) {
            if (getters.user) {
                Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `auth/me`).then(resp => {
                    let user = getters.user
                    user.balance = resp.data.result.balance
                    commit('user', user)
                }).catch(err => {
                })
            }
        },
    },
    mutations: {
        user(state, user) {
            localStorage.setItem('betexyuser', user ? JSON.stringify(user) : null)
            state.user = localStorage.getItem('betexyuser')
        }
    },
    getters: {
        user(state) {
            return state.user ? JSON.parse(localStorage.getItem('betexyuser')) : null;
        },
    },
}