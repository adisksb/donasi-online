<template>
  <div>
      <div class="mt-4 container detail-container">  
            <div v-if="loading == false">
                <div class="card shadow">
                    <img :src="campaign.image" class="card-img-top" :alt="campaign.title">
                    <div class="card-body">
                        <h5 class="card-title mb-0">{{ campaign.title }}</h5>

                        <div v-if="sumDonation.length > 0">
                            <div v-for="donation in sumDonation" :key="donation">
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
                            <span class="font-weight-bold">{{ donations.length }}</span> Donasi
                            <br>
                            <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi
                        </div>
                        <div class="mt-3">
                            <div v-if="maxDate(campaign.max_date) == true">
                                <button class="btn btn-danger">DONASI DITUTUP</button>
                            </div>
                            <div v-else>
                                <a href="#"
                                    class="btn btn-success w-100 font-weight-bold">
                                    DONASI SEKARANG
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow mt-2">
                    <div class="card-header text-center font-weight-bold">PENGGALANG DANA</div>
                    <div class="card-body text-center">
                        <img 
                            :src="user.avatar" 
                            class="rounded-circle" 
                            :alt="user.name"
                            style="height: 40px; width: 40px;"
                        >
                        <div>
                            {{ user.name }}
                        </div>
                    </div>
                </div>
                <div class="card shadow mt-2">
                    <div class="card-header text-center font-weight-bold">DESKRIPSI</div>
                    <div class="card-body" v-html="campaign.description"></div>
                </div>
                <div class="card shadow mt-2">
                    <div class="card-header text-center font-weight-bold">
                        Donasi <span class="text-primary">({{ donations.length }})</span>
                    </div>
                    <div class="card-body">
                        <div v-for="donation in donations" :key="donation.id">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <p>{{ donation.donatur.name }}</p>
                                    <div>
                                        Berdonasi sebesar <span class="font-weight-bold">Rp. {{ formatPrice(donation.amount) }}</span>
                                    </div>
                                    <div>
                                        {{ donation.pray }}
                                    </div>
                                    <div>
                                        {{ donation.created_at }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="loading == true">
                <FacebookLoader />
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions }  from 'vuex';
import { FacebookLoader } from 'vue-content-loader';

export default {
  name: 'campaign.show',

  components: {
      FacebookLoader
  },

  data() {
      return {
          campaign : [],
          user : {},
          sumDonation : [],
          donations: [],
          loading: false,
      }
  },

  methods: {
        ...mapActions({
            detailCampaignModule: 'campaign/getDetailCampaign',
        }),

        async getCampaign() {
            this.loading = true;
            await this.detailCampaignModule(this.$route.params.slug);
            this.campaign = this.$store.getters['campaign/detailCampaign'];
            this.user = this.$store.getters['campaign/user'];
            this.sumDonation = this.$store.getters['campaign/sumDonation'];
            this.donations = this.$store.getters['campaign/donations'];
            this.loading = false;
        },
    },

    created() {
        this.getCampaign();
    },
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .detail-container {
        width: 50%;
    }
}
</style>
