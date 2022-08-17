import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },

    // Auth
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue')
    },

    // Dashboard
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            auth: true
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue')
    },

    // Donation
    {
        path: '/donation',
        name: 'donation.index',
        meta: {
            auth: true
        },
        component: () => import(/* webpackChunkName: "donation.index" */ '@/views/donation/Index.vue')
    },
    {
        path: '/donation/create/:slug',
        name: 'donation.create',
        component: () => import( /* webpackChunkName: "donation.create" */ '@/views/donation/Create.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/donation/success',
        name: 'donation.success',
        meta: {
            auth: true
        },
        component: () => import(/* webpackChunkName: "donation.success" */ '@/views/donation/Success.vue')
    },
    {
        path: '/donation/failed',
        name: 'donation.failed',
        meta: {
            auth: true
        },
        component: () => import(/* webpackChunkName: "donation.failed" */ '@/views/donation/Failed.vue')
    },
    {
        path: '/donation/pending',
        name: 'donation.pending',
        meta: {
            auth: true
        },
        component: () => import(/* webpackChunkName: "donation.pending" */ '@/views/donation/Pending.vue')
    },

    // Profile
    {
        path: '/profile',
        name: 'profile',
        component: () => import( /* webpackChunkName: "profile" */ '@/views/profile/Index.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/profile/password',
        name: 'update.password',
        component: () => import( /* webpackChunkName: "update.password" */ '@/views/profile/Password.vue'),
        meta: {
            auth: true
        }
    },

    // Category
    {
        path: '/category',
        name: 'category.index',
        component: () => import( /* webpackChunkName: "category.index" */ '@/views/category/Index.vue')
    },
    {
        path: '/category/:slug',
        name: 'category.show',
        component: () => import( /* webpackChunkName: "category.show" */ '@/views/category/Show.vue')
    },

    // Campaigns
    {
        path: '/campaign',
        name: 'campaign.index',
        component: () => import( /* webpackChunkName: "campaign.index" */ '@/views/campaign/Index.vue')
    },
    {
        path: '/campaign/:slug',
        name: 'campaign.show',
        component: () => import( /* webpackChunkName: "campaign.show" */ '@/views/campaign/Show.vue')
    },

    // 404
    {
        path: '*',
        name: 'error.page',
        component: () => import( /* webpackChunkName: "error.page" */ '@/views/404/Index.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (store.getters['auth/authenticated']) {
        next()
        return
      }
      next({name: 'login'})
    } else {
      next()
    }

    if(to.name == 'login' && store.getters['auth/authenticated']) next ({name: 'dashboard'})
      else next()

    if(to.name == 'register' && store.getters['auth/authenticated']) next ({name: 'dashboard'})
      else next()
});

export default router;
