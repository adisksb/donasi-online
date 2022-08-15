<template>
    <div class="container">
        <div v-if="dataSliders.length > 0">
            <vueper-slides autoplay fixed-height="500px" 3d>
                <vueper-slide 
                    v-for="slider in dataSliders"
                    :key="slider.id"
                    :image="slider.image" 
                    :link="slider.link"
                />
                <template #pause>
                    <i class="icon pause_circle_outline"></i>
                </template>
            </vueper-slides>
        </div>
        <div v-else>
            <ContentLoader />
        </div>
    </div>
</template>

<script>
import { mapActions }  from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    name: 'slider',

    data() {
        return {
            dataSliders : [],
        }
    },

    components: {
        ContentLoader,
        VueperSlides,
        VueperSlide
    },

    methods: {
        ...mapActions({
            slidersModule: 'slider/getSliders',
        }),

        async getSliders() {
            await this.slidersModule();
            this.dataSliders = this.$store.getters['slider/sliders'];
        }
    },

    created() {
        this.getSliders();
    }
}
</script>
