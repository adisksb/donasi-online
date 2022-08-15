import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import donation from './donation';
import profile from './profile';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        donation,
        profile
    }
});
