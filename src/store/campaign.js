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
    },

    actions: {
        async getCampaign({commit}) {
            const config = {
                method: 'get',
                url : 'campaign',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_CAMPAIGNS', response.data.data.data)  ;
                if (response.data.data.current_page < response.data.data.last_page) {
                    //commit ke mutation SET_NEXTEXISTS dengan true
                    commit('SET_NEXTEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1)
                } else {
                    //commit ke mutation SET_NEXTEXISTS dengan false
                    commit('SET_NEXTEXISTS', false)
                }             
            })
            .catch((error) => {
                console.log(error);
            })
        }
    },
}