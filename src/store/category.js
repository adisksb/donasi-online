import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        categories: [],
        category: {},
        campaignCategory: []
    },

    getters: {
        categories(state) {
            return state.categories
        },
        category(state) {
            return state.category
        },
        campaignCategory(state) {
            return state.campaignCategory
        },
    },

    mutations: {
        SET_CATEGORIES(state, value) {
            state.categories = value
        },
        SET_CATEGORY(state, value) {
            state.category = value
        },
        SET_CAMPAIGN_CATEGORY(state, value) {
            state.campaignCategory = value
        },
    },

    actions: {
        async getCategories({commit}) {
            const config = {
                method: 'get',
                url : 'categoryHome',
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CATEGORIES', response.data.data);               
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async getCategory({commit}) {
            const config = {
                method: 'get',
                url : 'category',
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CATEGORIES', response.data.data.data);           
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async detailCategory({commit}, slug) {
            const config = {
                method: 'get',
                url : `category/${slug}`,
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CATEGORY', response.data.data);
                commit('SET_CAMPAIGN_CATEGORY', response.data.data.campaigns);         
            })
            .catch((error) => {
                console.log(error);
                if(error.message == 'Network Error') {
                    localStorage.removeItem('authenticated');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token'); 
                }
            })
        }
    },
}