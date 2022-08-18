<template>
  <div>
      <div class="mt-4 container detail-container">  
            <div v-if="loading == false">
                <div class="card shadow">
                    <img :src="campaign.image" class="card-img-top" :alt="campaign.title">
                    <div class="card-body">
                        <h5 class="card-title mb-0">{{ campaign.title }}</h5>
                        
                        <div>
                            <div v-if="campaign.sum_donation .length > 0">
                                <div class="progress mb-2 mt-3">
                                    <div 
                                        class="progress-bar-striped bg-warning" 
                                        role="progressbar" 
                                        v-bind:style="{ width: percentage(campaign.sum_donation[0].total, campaign.target_donation) + '%' }"
                                        v-bind:aria-valuenow="campaign.sum_donation[0].total/campaign.target_donation"
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    >
                                    </div>
                                </div>
                                <p>
                                    <span class="font-weight-bold text-primary">
                                        Rp. {{ formatPrice(campaign.sum_donation[0].total) }} 
                                    </span> Terkumpul dari 
                                    <span class="font-weight-bold text-success">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                </p>
                                <p>
                                    Persentase Donasi : 
                                    <span class="text-info font-weight-bold">
                                        {{ percentage(campaign.sum_donation[0].total, campaign.target_donation) }} %
                                    </span> 
                                </p>
                            </div>
                            <div v-else>
                                <div class="progress mb-2 mt-3">
                                    <div 
                                        class="progress-bar-striped bg-warning" 
                                        role="progressbar" 
                                        v-bind:style="{ width: percentage(0, campaign.target_donation) + '%' }"
                                        v-bind:aria-valuenow="0/campaign.target_donation"
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    >
                                    </div>
                                </div>
                                <p>
                                    <span class="font-weight-bold text-primary">
                                        Rp. {{ formatPrice(0) }} 
                                    </span> Terkumpul dari 
                                    <span class="font-weight-bold text-success">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                </p>
                                <p>
                                    Persentase Donasi : 
                                    <span class="text-info font-weight-bold">
                                        {{ percentage(0, campaign.target_donation) }} %
                                    </span> 
                                </p>
                            </div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <span class="font-weight-bold">{{ donations.length }}</span> Donasi
                            </div>
                            <div class="col-md-6 d-flex justify-content-md-end">
                                <span class="font-weight-bold mr-1">{{ countDay(campaign.max_date) }}</span> hari lagi
                            </div>
                        </div>
                        <div class="mt-3">
                            <div v-if="maxDate(campaign.max_date) == true">
                                <button class="btn btn-danger">DONASI DITUTUP</button>
                            </div>
                            <div v-else>
                                <router-link 
                                    :to="{name: 'donation.create', params:{slug: this.$route.params.slug}}"
                                    class="btn btn-success w-100 font-weight-bold"
                                >
                                    DONASI SEKARANG
                                </router-link>
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
                        Donatur <span class="text-primary">({{ donations.length }})</span>
                    </div>
                    <div class="card-body">
                        <div v-for="donation in donations" :key="donation.id">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <div class="mb-3">
                                        <p class="font-weight-bold mb-0 mt-0">{{ donation.donatur.name }}</p>
                                        {{ donation.created_at }}
                                    </div>
                                    <div>
                                        Berdonasi sebesar 
                                        <span class="font-weight-bold text-primary">
                                            Rp. {{ formatPrice(donation.amount) }}
                                        </span>
                                    </div>
                                    <hr>
                                    <div class="mt-1">
                                        <p class="mb-0 mt-">Doa :</p>
                                        {{ donation.pray }}
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
            // console.log('sumDonation :', this.sumDonation);
            // console.log('campaign :', this.campaign);
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

<!-- v-bind:style="{ width: percentage(donation.total, campaign.target_donation) + '%' }" -->
