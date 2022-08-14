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
  }
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
