import Vue from "vue";

export default {
    namespaced: true,
    strategies: [],
    actions: {
        constants({commit}) {
            return Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `data/constants`).then(resp => {
                commit('currencies', resp.data.result.currencies)
                commit('bookmakers', resp.data.result.bookmakers)
                commit('room_statuses', resp.data.result.room_statuses)
                commit('bet_modes', resp.data.result.bet_modes)
                commit('bet_types', resp.data.result.bet_types)
                commit('sports', resp.data.result.sports)
                commit('markets', resp.data.result.markets)
                commit('targets', resp.data.result.targets)
            }).catch(err => {
                Vue.prototype.flashMessage.show({
                    status: 'error',
                    title: 'Что-то пошло не так',
                    message: 'Не удалось получить данные'
                })
            })
        },
        strategies({commit}) {
            Vue.prototype.$http.get(process.env.VUE_APP_API_HOST + `data/strategies`).then(resp => {
                commit('strategies', resp.data.result.items)
            }).catch(err => {
                Vue.prototype.flashMessage.show({
                    status: 'error',
                    title: 'Что-то пошло не так',
                    message: 'Не удалось получить данные'
                })
            })
        },
    },
    mutations: {
        pay_systems(state, systems) {
            localStorage.setItem('pay_systems', JSON.stringify(systems ? systems : []))
        },
        currencies(state, currencies) {
            localStorage.setItem('currencies', JSON.stringify(currencies ? currencies : []))
        },
        bookmakers(state, bks) {
            localStorage.setItem('bookmakers', JSON.stringify(bks ? bks : []))
        },
        room_statuses(state, data) {
            localStorage.setItem('room_statuses', JSON.stringify(data ? data : []))
        },
        bet_modes(state, data) {
            localStorage.setItem('bet_modes', JSON.stringify(data ? data : []))
        },
        bet_types(state, data) {
            localStorage.setItem('bet_types', JSON.stringify(data ? data : []))
        },
        sports(state, data) {
            localStorage.setItem('sports', JSON.stringify(data ? data : []))
        },
        markets(state, data) {
            localStorage.setItem('markets', JSON.stringify(data ? data : []))
        },
        targets(state, data) {
            localStorage.setItem('targets', JSON.stringify(data ? data : []))
        },
        strategies(state, data) {
            state.strategies = data
        },
    },
    getters: {
        pay_systems(state) {
            return JSON.parse(localStorage.getItem('pay_systems'))
        },
        currencies(state) {
            return JSON.parse(localStorage.getItem('currencies'))
        },
        bookmakers(state) {
            return JSON.parse(localStorage.getItem('bookmakers'))
        },
        room_statuses(state) {
            return JSON.parse(localStorage.getItem('room_statuses'))
        },
        bet_modes(state) {
            return JSON.parse(localStorage.getItem('bet_modes'))
        },
        bet_types(state) {
            return JSON.parse(localStorage.getItem('bet_types'))
        },
        sports(state) {
            return JSON.parse(localStorage.getItem('sports'))
        },
        markets(state) {
            return JSON.parse(localStorage.getItem('markets'))
        },
        targets(state) {
            return JSON.parse(localStorage.getItem('targets'))
        },
        strategies(state) {
            return state.strategies
        },
    },
}