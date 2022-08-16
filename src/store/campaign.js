import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        campaigns: [],
        nextExists: false,
        nextPage: 0,
    },

    getters: {
        campaigns(state) {
            return state.campaigns
        },
        nextExists(state) {
            return state.nextExists
        },
        nextPage(state) {
            return state.nextPage
        },
    },

    mutations: {
        SET_CAMPAIGNS(state, value) {
            state.campaigns = value
        },
        SET_NEXTEXISTS(state, value) {
            state.nextExists = value
        },
        SET_NEXTPAGE(state, value) {
            state.nextPage = value
        },
        SET_LOADMORE(state, data) {
            data.forEach(row => {
                state.campaigns.push(row);
            });
        },
    },

    actions: {
        async getCampaign({commit}) {
            const config = {
                method: 'get',
                url : 'campaign',
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CAMPAIGNS', response.data.data.data);
                if (response.data.data.current_page < response.data.data.last_page) {
                    commit('SET_NEXTEXISTS', true);
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1);
                } else {
                    commit('SET_NEXTEXISTS', false);
                }             
            })
            .catch((error) => {
                if (!error.response) {
                    console.log('Error: Network Error');
                } else {
                    console.log(error);
                    if(error.message == 'Network Error') {
                        localStorage.removeItem('authenticated');
                        localStorage.removeItem('user');
                        localStorage.removeItem('token'); 
                    }
                }
            })
        },

        async getLoadMore({commit}, nextPage) {
            await axios.get(`/campaign?page=${nextPage}`)
            .then(response => {
                commit('SET_LOADMORE', response.data.data.data)
                if (response.data.data.current_page < response.data.data.last_page) {
                    commit('SET_NEXTEXISTS', true);
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1);
                } else {
                    commit('SET_NEXTEXISTS', false);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
}