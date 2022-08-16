<template>
    <div class="container">
        <div class="row d-flex justify-content-between" v-if="categories.length > 0">
            <div class="col-md-3 text-center mb-2" v-for="category in categories" :key="category.id">
                <router-link :to="{name: 'category.show', params:{slug: category.slug}}" class="text-decoration-none">
                    <div class="mx-auto rounded bg-card p-3 text-white w-75">
                        <div>
                            <img :src="category.image" width="40" class="inline-block mb-2">
                        </div>
                        {{ category.name.toUpperCase() }}
                    </div>
                </router-link>
            </div>
            <div class="col-md-3 text-center align-items-center mb-2">
                <router-link :to="{name: 'category.index'}" class="text-decoration-none">
                    <div class="mx-auto rounded bg-card p-3 text-white w-75">
                        <div>
                            <img src="@/assets/images/menu.png" width="40" class="inline-block mb-2">
                        </div>
                        LAINNYA
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
    name: 'category',

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
            categoriesModule: 'category/getCategories',
        }),

        async getCategories() {
            await this.categoriesModule();
            this.categories = this.$store.getters['category/categories'];
        }
    },

    created() {
        this.getCategories();
    }
}
</script>

<style scoped>
.bg-card {
    background: #1B2430;
}
</style>
