<template>
  <div>
      <div class="mt-4 container">
            <div v-if="loading == true">
                <FacebookLoader />
            </div>

            <div v-if="campaignCategory.length > 0">
                <h3 class="mb-4"> <i class="fa fa-list-ul"></i> KATEGORI 
                    <strong class="text-primary font-weight-bold">{{ category.name.toUpperCase() }}</strong>
                </h3>
                <div class="row" >
                    <div class="col-md-6 mb-3" v-for="campaign in campaignCategory" :key="campaign.id">
                        <div class="card shadow">
                            <img :src="campaign.image" class="card-img-top" :alt="campaign.title">
                            <div class="card-body">
                                <h5 class="card-title mb-0">{{ campaign.title }}</h5>
                                <p class="card-text mt-0 font-weight-bold">{{ campaign.user.name }}</p>
                                <div v-if="campaign.sum_donation.length > 0">
                                    <div v-for="(donation, index) in campaign.sum_donation" :key="index">
                                        <div class="progress mb-2">
                                            <div 
                                                class="progress-bar bg-warning" 
                                                role="progressbar" 
                                                v-bind:style="{ width: percentage(donation.total, campaign.target_donation) + '%' }"
                                                v-bind:aria-valuenow="donation.total"
                                                aria-valuemin="0" 
                                                aria-valuemax="100"
                                            >
                                            </div>
                                        </div>
                                        <p>
                                            <span class="font-weight-bold text-primary">
                                                Rp. {{ formatPrice(donation.total) }} 
                                            </span> terkumpul dari
                                            <span class="font-weight-bold text-success">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="progress mb-2">
                                        <div 
                                            class="progress-bar bg-warning" 
                                            role="progressbar" 
                                            v-bind:style="{ width: percentage(0, campaign.target_donation) + '%' }"
                                            v-bind:aria-valuenow="0"
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        >
                                        </div>
                                    </div>
                                    <p>
                                        <span class="font-weight-bold text-primary">Rp. 0 </span> terkumpul dari
                                        <span class="font-weight-bold text-success">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                    </p>
                                </div>
                                <div class="mt-3">
                                    <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="empty == true">
                Data Campaign Berdasarkan Kategori 
                <span class="text-danger text-center font-weight-bold text-uppercase">{{ category.name }}</span> 
                Belum Tersedia!
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions }  from 'vuex';
import { FacebookLoader } from 'vue-content-loader';

export default {
  name: 'category.show',

  components: {
      FacebookLoader
  },

  data() {
      return {
          campaignCategory : [],
          category : '',
          loading : false,
          empty : false,
      }
  },

  methods: {
        ...mapActions({
            detailCategoryModule: 'category/detailCategory',
        }),

        async getCategory() {
            this.loading = true;
            await this.detailCategoryModule(this.$route.params.slug);
            this.campaignCategory = this.$store.getters['category/campaignCategory'];
            this.category = this.$store.getters['category/category'];
            this.loading = false;
            if (this.campaignCategory.length <= 0) {
                this.empty = true;
            }
        },
    },

    created() {
        this.getCategory();
    },
}
</script>
