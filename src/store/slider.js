import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        sliders: [],
    },

    getters: {
        sliders(state) {
            return state.sliders
        },
    },

    mutations: {
        SET_SLIDERS(state, value) {
            state.sliders = value
        },
    },

    actions: {
        async getSliders({commit}) {
            const config = {
                method: 'get',
                url : 'slider',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_SLIDERS', response.data.data)               
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}