<template>
    <form class="form-inline my-2 my-lg-0">
        <input 
            class="w-100 form-control mr-sm-2" 
            type="search" 
            placeholder="Cari Campaign" 
            aria-label="Search"
            @click="linkToSearch"
            @keyup="searchQuery"
            v-model="search"
        >
    </form>
</template>

<script>
import { mapActions }  from 'vuex';

export default {
    name: 'searchComponent',

    data() {
        return {
            search: null,
        }
    },

    methods: {
        ...mapActions({
            getSearchCampaign: 'campaign/searchCampaign',
        }),

        linkToSearch() {
            this.$router.push({ name: 'search' }).catch(()=>{})
        },

        async searchQuery() {
            await this.getSearchCampaign(this.search);
        }
    }
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .form-inline {
        width: 50%;
    }
}
</style>
