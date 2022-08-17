<template>
    <div class="mt-3 container">
            <form class="form-inline my-2 my-lg-0">
            <input 
                class="w-100 form-control mr-sm-2" 
                type="search" 
                placeholder="Cari Campaign" 
                aria-label="Search"
                @click="linkToSearch"
            >
            <!-- <button class="btn btn-primary ml-2" type="submit">Search</button> -->
        </form>
    </div>
</template>

<script>
export default {
    name: 'searchComponent',

    methods: {
        linkToSearch() {
            this.$router.push({name: 'search'})
        }
    }
}
</script>
