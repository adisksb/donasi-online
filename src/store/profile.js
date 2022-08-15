import axios from 'axios';
import router from '../router';

export default { 
    namespaced: true,

    state: {
        profile: {},
        errors : {}, 
        success : '',
    },

    getters: {
        profile(state) {
            return state.profile
        },
        errors(state) {
            return state.errors
        },
        success(state) {
            return state.success
        },
    },

    mutations: {
        SET_PROFILE(state, value) {
            state.profile = value
        },
        SET_ERRORS(state, value) {
            state.errors = value
        },
        SET_SUCCESS(state, value) {
            state.success = value
        },
    },

    actions: {
        async getProfile({commit}) {
            const config = {
                method: 'get',
                url : 'profile',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_PROFILE', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async updateProfile({commit}, data) {
            const config = {
                method: 'post',
                url : 'profile',
                data: data,
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_PROFILE', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async updatePassword({commit}, data) {
            const config = {
                method: 'post',
                url : 'profile/password',
                data: data,
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_PROFILE', response.data.data);
                commit('SET_ERRORS', null);
                commit('SET_SUCCESS', `Berhasil Ubah Password`);
                router.push({name: 'dashboard'});  
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data);
            })
        },
    },
}