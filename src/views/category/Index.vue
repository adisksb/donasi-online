<template>
    <div class="container mt-4">
        <div class="row d-flex justify-content-between" v-if="categories.length > 0">
            <div class="col-md-4 text-center mb-3" v-for="category in categories" :key="category.id">
                <router-link :to="{name: 'category.show', params:{slug: category.slug}}" class="text-decoration-none">
                    <div class="mx-auto rounded bg-card p-3 text-white w-75">
                        <div>
                            <img :src="category.image" width="40" class="inline-block mb-2">
                        </div>
                        {{ category.name.toUpperCase() }}
                    </div>
                </router-link>
            </div>
        </div>
        <div v-else>
            <ContentLoader />
        </div>
    </div>
</template>

<script>
import { mapActions }  from 'vuex';
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'category.index',

    data() {
        return {
            categories : [],
        }
    },

    components: {
        ContentLoader,
    },

    methods: {
        ...mapActions({
            categoryModule: 'category/getCategory',
        }),

        async getCategory() {
            await this.categoryModule();
            this.categories = this.$store.getters['category/categories'];
        }
    },

    created() {
        this.getCategory();
    }
}
</script>

<style scoped>
.bg-card {
    background: #1B2430;
}
</style>
