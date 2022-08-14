import axios from 'axios';
import router from '../router';

export default { 
    namespaced: true,

    state: {
        authenticated: localStorage.getItem('authenticated') || false,
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        loading : false,
        btnregisterlogin : true,
        errors : {}, 
        success : '',
    },

    getters: {
        authenticated(state) {
            return state.authenticated
        },
        token(state) {
            return state.token
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        errors(state) {
            return state.errors
        },
        success(state) {
            return state.success
        },
    },

    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_TOKEN(state, value) {
            state.token = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_LOADING(state, value) {
            state.loading = value
        },
        SET_ERRORS(state, value) {
            state.errors = value
        },
        SET_SUCCESS(state, value) {
            state.success = value
        },
    },

    actions: {
        async register({commit}, data) {
            commit('SET_LOADING', true);
            try {
                let response = await axios.post('register', data); 
                const token = response.data.token;
                const user = response.data.data;  
                localStorage.setItem('authenticated', true);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                commit('SET_AUTHENTICATED', true);
                commit('SET_TOKEN', token); 
                commit('SET_USER', user);
                commit('SET_LOADING', false); 
                commit('SET_ERRORS', null);
                commit('SET_SUCCESS', `Berhasil Registrasi Akun`);
                router.push({name: 'dashboard'});       
            } catch (error) {
                console.log(error);
                localStorage.removeItem('authenticated');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                commit('SET_AUTHENTICATED', false);
                commit('SET_TOKEN', ''); 
                commit('SET_USER', null);
                commit('SET_LOADING', false);
                commit('SET_ERRORS', error.response.data);
            }
        },

        async login({commit}, data) {
            commit('SET_LOADING', true);
            try {
                let response = await axios.post('login', data); 
                const token = response.data.token;
                const user = response.data.data;  
                localStorage.setItem('authenticated', true);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                commit('SET_AUTHENTICATED', true);
                commit('SET_TOKEN', token); 
                commit('SET_USER', user);
                commit('SET_LOADING', false); 
                commit('SET_ERRORS', null);
                commit('SET_SUCCESS', `Berhasil Login Akun`);
                router.push({name: 'dashboard'});       
            } catch (error) {
                console.log(error);
                localStorage.removeItem('authenticated');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                commit('SET_AUTHENTICATED', false);
                commit('SET_TOKEN', ''); 
                commit('SET_USER', null);
                commit('SET_LOADING', false);
                commit('SET_ERRORS', error.response.data);
            }
        },

        logout({commit}) {
            localStorage.removeItem('authenticated')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
            commit('SET_TOKEN', ''); 
        },
    },
}