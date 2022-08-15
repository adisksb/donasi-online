import axios from 'axios';

export default { 
    namespaced: true,

    state: {
        donations: [],
        nextExists: false,
        nextPage: 0,
    },

    getters: {
        donations(state) {
            return state.donations
        },
        nextExists(state) {
            return state.nextExists
        },
        nextPage(state) {
            return state.nextPage
        },
    },

    mutations: {
        SET_DONATIONS(state, value) {
            state.donations = value
        },
        SET_NEXTEXISTS(state) {
            return state.nextExists
        },
        SET_NEXTPAGE(state) {
            return state.nextPage
        },
        SET_LOADMORE(state, data) {
            data.forEach(row => {
                state.donations.push(row);
            });
        },
    },

    actions: {
        async getDonation({commit}) {
            const config = {
                method: 'get',
                url : 'donation',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                commit('SET_DONATIONS', response.data.data.data);
                // console.log(response.data.data.data);
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
        },

        async getLoadMore({commit}, nextPage) {
            const config = {
                method: 'get',
                url : `donation?page=${nextPage}`,
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            }

            await axios(config)      
            .then((response) => {
                //commit ke mutation SET_LOADMORE dengan response data
                commit('SET_LOADMORE', response.data.data.data)

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
        },
    },
}