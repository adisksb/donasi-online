<template>
    <div>
        <div class="container text-center mt-5">
            <span class="text-danger font-weight-bold">THE PAGE NOT FOUND</span>
            <div>
                <button class="btn btn-info px-5 mt-3" @click.prevent="home">HOME</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error.page',

    methods: {
        home() {
            this.$router.push({name: 'home'});
        }
    }
}
</script>
