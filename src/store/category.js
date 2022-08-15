import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        categories: [],
    },

    getters: {
        categories(state) {
            return state.categories
        },
    },

    mutations: {
        SET_CATEGORIES(state, value) {
            state.categories = value
        },
    },

    actions: {
        async getCategories({commit}) {
            const config = {
                method: 'get',
                url : 'categoryHome',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CATEGORIES', response.data.data)               
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}