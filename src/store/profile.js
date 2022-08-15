import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        profile: {},
    },

    getters: {
        profile(state) {
            return state.profile
        },
    },

    mutations: {
        SET_PROFILE(state, value) {
            state.profile = value
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
                // if(error.response.data.message.desc) {
                //     this.$toast.error(`Caption Tidak Boleh Kosong`);
                // }

                // if(error.response.data.message.image) {
                //     this.$toast.error(`Image Tidak Boleh Kosong`);
                // }
            })
        },
    },
}