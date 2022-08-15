import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import donation from './donation';
import profile from './profile';
import slider from './slider';
import category from './category';
import campaign from './campaign';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        donation,
        profile,
        slider,
        category,
        campaign
    }
});
