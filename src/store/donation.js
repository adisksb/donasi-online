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
        SET_NEXTEXISTS(state, value) {
            state.nextExists = value
        },
        SET_NEXTPAGE(state, value) {
            state.nextPage = value
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
                console.log('SET_DONATIONS :', response.data.data.data);
                if (response.data.data.current_page < response.data.data.last_page) {
                    commit('SET_NEXTEXISTS', true);
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1);
                } else {
                    commit('SET_NEXTEXISTS', false);
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
                commit('SET_LOADMORE', response.data.data.data)

                if (response.data.data.current_page < response.data.data.last_page) {
                    commit('SET_NEXTEXISTS', true)
                    commit('SET_NEXTPAGE', response.data.data.current_page + 1)
                } else {
                    commit('SET_NEXTEXISTS', false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },

        storeDonation({commit}, data) {
            return new Promise((resolve, reject) => {
                axios.post('donation', data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                    .then((response) => {
                        commit('');
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error.response.data);
                    })
                })   
        },
    },
}