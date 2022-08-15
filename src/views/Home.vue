<template>
  <div>
      <Search />
      <div class="mt-2">
          <Slider />
      </div>
      <div class="mt-4">
          <Category />
      </div>
      <div class="mt-4 container">
          <div class="row" v-if="campaigns.length > 0">
              <div class="col-md-6 mb-3" v-for="campaign in campaigns" :key="campaign.id">
                  <div class="card shadow">
                      <img :src="campaign.image" class="card-img-top" :alt="campaign.title">
                      <div class="card-body">
                          <h5 class="card-title mb-0">{{ campaign.title }}</h5>
                          <p class="card-text mt-0 font-weight-bold">{{ campaign.user.name }}</p>

                          <div v-if="campaign.sum_donation.length > 0">
                              <div v-for="donation in campaign.sum_donation" :key="donation">
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
          
          <div v-else>
              <div v-for="index in 2" :key="index" class="grid grid-cols-1 bg-white rounded shadow-md p-3 text-sm mt-4 mb-4">
                  <FacebookLoader class="h-24"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions }  from 'vuex';
import Search from '@/components/Search.vue';
import Slider from '@/components/Slider.vue';
import Category from '@/components/Category.vue';
import { FacebookLoader } from 'vue-content-loader';

export default {
  name: 'home',

  components: {
      Search,
      Slider,
      Category,
      FacebookLoader
  },

  data() {
      return {
          campaigns : [],
      }
  },

  methods: {
        ...mapActions({
            campaignsModule: 'campaign/getCampaign',
        }),

        async getCampaign() {
            await this.campaignsModule();
            this.campaigns = this.$store.getters['campaign/campaigns'];
            console.log(this.campaigns);
        }
    },

    created() {
        this.getCampaign();
    }
}
</script>
