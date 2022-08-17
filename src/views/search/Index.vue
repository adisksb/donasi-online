<template>
    <div>
        <div class="container mt-4">
            <div v-if="query == ''" >
                <div class="text-primary text-center font-weight-bold">
                    <h3>Lakukan Pencarian dengan memasukkan Keyword Donasi</h3>
                </div>
            </div>
            <div v-else> 
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
                    <div class="text-danger text-center font-weight-bold">
                        <h3>Data Campaign Tidak Ditemukan!</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters }  from 'vuex';

export default {
    name: 'search',

    methods: {
        dataQuery() {
            this.query;
        }
    },

    computed: {
        ...mapGetters({
              campaigns : 'campaign/searchCampaigns',
              query : 'campaign/query',
        })
    },

    created() {
        this.dataQuery();
    },
}
</script>
