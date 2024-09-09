import Vue from 'vue'
import Router from 'vue-router'
import storage from "@/store";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('./views/Home.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: () => import('./views/auth/Login.vue'),
        },
        {
            path: '/signup',
            component: () => import('./views/auth/Signup.vue'),
        },
        {
            path: '/reset',
            component: () => import('./views/auth/Reset.vue'),
        },
        {
            path: '/newpass',
            component: () => import('./views/auth/NewPass.vue'),
        },
        {
            path: '/rooms',
            component: () => import('./views/rooms/Index.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/rooms/create',
            component: () => import('./views/rooms/Create.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/strategies',
            component: () => import('./views/strategies/Index.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/strategies/create',
            component: () => import('./views/strategies/Create.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/public-strategies',
            component: () => import('./views/strategies/Public.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/bets/placed',
            component: () => import('./views/bets/Placed.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/bets/settled',
            component: () => import('./views/bets/Settled.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/statistic/strategy',
            component: () => import('./views/statistic/Strategy.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/statistic/room',
            component: () => import('./views/statistic/Room.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/statistic/user',
            component: () => import('./views/statistic/User.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/payment',
            component: () => import('./views/Payment.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/pages/payment-success',
            component: () => import('./views/pages/PaymentSuccess.vue'),
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/logout') {
        storage.dispatch('auth/logout')
    }
    if (to.path === '/login' && storage.getters["auth/user"]) {
        next('/');
        return
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (storage.getters["auth/user"]) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router