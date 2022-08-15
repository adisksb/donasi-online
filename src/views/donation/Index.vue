<template>
    <div class="container mt-4">
        <div v-if="donations.length > 0">
            <h4>Riwayat Donasi Saya</h4>
            <div class="row">
                <div class="col-4" v-for="donation in donations" :key="donation.id">
                    <div class="card" style="width: 18rem;">
                        <img 
                            :src="donation.campaign.image" 
                            class="card-img-top" 
                            :alt="donation.campaign.title"
                        >
                        <div class="card-body">
                            <router-link :to="{name: 'campaign.show', params:{slug: donation.campaign.slug}}">
                                <h5 class="card-title">{{ donation.campaign.title }}</h5>
                            </router-link>
                            <p>{{ donation.created_at }}</p>
                            <p>Rp. {{ formatPrice(donation.amount) }}</p>
                            
                            <div v-if="donation.status == 'pending'">
                                <button class="btn btn-sm btn-info">BAYAR SEKARANG</button>
                            </div>
                            <hr>
                            <div v-if="donation.status == 'success'">
                                <button class="btn btn-sm btn-success">Berhasil</button>
                            </div>
                            <div v-else-if="donation.status == 'pending'">
                                <button class="btn btn-sm btn-info">Pending</button>
                            </div>
                            <div v-else-if="donation.status == 'expired'">
                                <button class="btn btn-sm btn-primary">Dibatalkan</button>
                            </div>
                            <div v-else-if="donation.status == 'failed'">
                                <button class="btn btn-sm btn-danger">Dibatalkan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3" v-show="nextExists">
                <a @click="loadMore"
                    class="btn btn-secondary">LIHAT SEMUA <i class="fa fa-long-arrow-alt-right"></i>
                </a>
            </div>
        </div>
        <div class="text-center" v-else>
            <h4>Riwayat Donasi Saya</h4>
            <div class="text-danger">
                Anda Belum Memiliki Transaksi Donasi Saat ini!
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';

export default {
    name: 'donation.index',

    methods: {
        ...mapActions({
            getDonationModule: 'donation/getDonation',
            getLoadMoreModule: 'donation/getLoadMore',
        }),

        async dataDonations() {
            await this.getDonationModule();
        },

        async dataLoadMore() {
            await this.getLoadMoreModule(this.nextPage.value);
        }
    },

    computed: {
        ...mapGetters({
            donations : 'donation/donations',
            nextExists  : 'donation/nextExists',
            nextPage  : 'donation/nextPage',
        })
    },

    created() {
        this.dataDonations();
        this.dataLoadMore();
    },

    mounted() {
        console.log(this.donations);
    }
}
</script>