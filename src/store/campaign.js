import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        campaigns: [],
        searchCampaigns: [],
        query: '',
        nextExists: false,
        nextPage: 0,
        user: {},
        detailCampaign: [],
        sumDonation: [],
        donations: []
    },

    getters: {
        campaigns(state) {
            return state.campaigns
        },
        searchCampaigns(state) {
            return state.searchCampaigns
        },
        query(state) {
            return state.query
        },
        nextExists(state) {
            return state.nextExists
        },
        nextPage(state) {
            return state.nextPage
        },
        user(state) {
            return state.user
        },
        detailCampaign(state) {
            return state.detailCampaign
        },
        sumDonation(state) {
            return state.sumDonation
        },
        donations(state) {
            return state.donations
        },
    },

    mutations: {
        SET_CAMPAIGNS(state, value) {
            state.campaigns = value
        },
        SET_SEARCH_CAMPAIGNS(state, value) {
            state.searchCampaigns = value
        },
        SET_QUERY(state, value) {
            state.query = value
        },
        SET_NEXTEXISTS(state, value) {
            state.nextExists = value
        },
        SET_NEXTPAGE(state, value) {
            state.nextPage = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_DETAIL_CAMPAIGN(state, value) {
            state.detailCampaign = value
        },
        SET_SUM_DONATION(state, value) {
            state.sumDonation = value
        },
        SET_DONATIONS(state, value) {
            state.donations = value
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
                console.log(error);
                if(error.message == 'Network Error') {
                    localStorage.removeItem('authenticated');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token'); 
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
        },

        async getDetailCampaign({commit}, slug) {
            const config = {
                method: 'get',
                url : `campaign/${slug}`,
            }

            await axios(config)      
            .then((response) => {
                commit('SET_DETAIL_CAMPAIGN', response.data.data);
                commit('SET_USER', response.data.data.user); 
                commit('SET_SUM_DONATION', response.data.data.sum_donation);
                commit('SET_DONATIONS', response.data.donations);     
                // console.log('SET_SUM_DONATION :', response.data.data.sum_donation);   
                // console.log('SET_DONATIONS :', response.data.donations); 
            })
            .catch((error) => {
                console.log(error);
                if(error.message == 'Network Error') {
                    localStorage.removeItem('authenticated');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token'); 
                }
            })
        },

        async searchCampaign({commit}, querySearch ='') {
            const config = {
                method: 'get',
                url : `search?q=${querySearch}`,
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }
                
            await axios(config)      
            .then((response) => {
                commit('SET_QUERY', querySearch); 
                commit('SET_SEARCH_CAMPAIGNS', response.data.data.data);  
            })
            .catch((error) => {
                console.log(error);
                if(error.message == 'Network Error') {
                    localStorage.removeItem('authenticated');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token'); 
                }
            })
        },
    },
}