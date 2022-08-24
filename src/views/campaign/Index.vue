<template>
  <div>
      <div class="mt-4 container">
            <div v-if="loading == true">
                <FacebookLoader/>
            </div>

            <div v-if="loading == false">
                <div class="row" v-if="campaigns.length > 0">
                    <div class="col-md-6 mb-3" v-for="campaign in campaigns" :key="campaign.id">
                        <div class="card shadow">
                            <img :src="campaign.image" class="card-img-top" :alt="campaign.title">
                            <div class="card-body">
                                <h5 class="card-title mb-0">{{ campaign.title }}</h5>
                                <p class="card-text mt-0 font-weight-bold">{{ campaign.user.name }}</p>

                                <div v-if="campaign.sum_donation.length > 0">
                                    <div v-for="(donation, index) in campaign.sum_donation" :key="index">
                                        <div class="progress mb-2">
                                            <div 
                                                class="progress-bar-striped bg-warning" 
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
                                <div class="mt-3">
                                    <router-link :to="{name: 'campaign.show', params:{slug: campaign.slug }}"
                                    class="btn btn-secondary w-100 font-weight-bold">
                                        LIHAT
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else>
                    <div class="text-center font-weight-bold text-danger mt-4 text-uppercase">
                        Belum ada data campaigns
                    </div>
                </div>
            </div>
      </div>

      <div class="text-center mt-4 mb-4" v-if="nextExists">
          <button @click="loadMore" class="btn btn-primary">LIHAT SEMUA</button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';
import { FacebookLoader } from 'vue-content-loader';

export default {
  name: 'campaign.index',

  components: {
      FacebookLoader
  },

  data() {
      return {
          campaigns : [],
          loading : false,
      }
  },

  methods: {
        ...mapActions({
            campaignsModule: 'campaign/getCampaign',
            loadMoreModule: 'campaign/getLoadMore',
        }),

        async getCampaign() {
            this.loading = true;
            await this.campaignsModule();
            this.campaigns = this.$store.getters['campaign/campaigns'];
            this.loading = false;
        },

        async loadMore() {
            await this.loadMoreModule(this.nextPage);
        }
    },

    computed: {
        ...mapGetters({
              nextExists: 'campaign/nextExists',
              nextPage: 'campaign/nextPage'
        })
    },

    created() {
        this.getCampaign();
    },
}
</script>
