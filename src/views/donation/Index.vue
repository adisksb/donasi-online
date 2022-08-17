<template>
    <div class="container mt-4">
        <div v-if="loading == true">
            <FacebookLoader />
        </div>

        <div v-if="donations.length > 0">
            <h4 class="mb-3 text-center">Riwayat Donasi Saya</h4>
            <div class="row">
                <div class="col-md-6" v-for="donation in donations" :key="donation.id">
                    <div class="card shadow mb-3">
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
                                <button @click.prevent="payment(donation.snap_token)" class="btn font-weight-bold btn-primary w-100">
                                    BAYAR SEKARANG
                                </button>
                            </div>
                            <div v-if="donation.status == 'success'">
                                <button class="btn font-weight-bold btn-success w-100" disabled>
                                    Berhasil
                                </button>
                            </div>
                            <div v-else-if="donation.status == 'failed'">
                                <button class="btn font-weight-bold btn-danger w-100">
                                    Pending
                                </button>
                            </div>
                            <div v-else-if="donation.status == 'expired'">
                                <button class="btn font-weight-bold btn-danger w-100">
                                    Dibatalkan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-3" v-show="nextExists">
                <button @click="loadMore"
                    class="btn btn-secondary">LIHAT SEMUA <i class="fa fa-long-arrow-alt-right"></i>
                </button>
            </div>
        </div>

        <div class="text-center" v-if="empty == true">
            <h4>Riwayat Donasi Saya</h4>
            <div class="text-danger">
                Anda Belum Memiliki Transaksi Donasi Saat ini!
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';
import { FacebookLoader } from 'vue-content-loader';
import router from '../../router';

export default {
    name: 'donation.index',

    components: {
        FacebookLoader
    },

    data() {
        return {
            donations : [],
            loading : false,
            empty : false,
        }
    },

    methods: {
        ...mapActions({
            getDonationModule: 'donation/getDonation',
            getLoadMoreModule: 'donation/getLoadMore',
        }),

        async dataDonations() {
            this.loading = true;
            await this.getDonationModule();
            this.donations = this.$store.getters['donation/donations'];
            this.loading = false;
            if (this.donations.length <= 0) {
                this.empty = true;
            }
        },

        async loadMore() {
            await this.getLoadMoreModule(this.nextPage);
        },

        async payment(snap_token) {
                await window.snap.pay(snap_token, {
                    onSuccess: function () {
                        router.push({name: 'donation.success'});
                        this.$toast.success('Transaksi Berhasil, Silahkan Melakukan Pembayaran Donasi');
                    },
                    onPending: function () {
                        window.location.reload();
                        this.$toast.success('Transaksi belum Berhasil, Silahkan Melakukan Transaksi Ulang');
                    },
                    onError: function () {
                        router.push({name: 'donation.failed'}); 
                        this.$toast.success('Transaksi Gagal');
                    }
                })
            }
        },

    computed: {
        ...mapGetters({
            nextExists  : 'donation/nextExists',
            nextPage  : 'donation/nextPage',
        })
    },

    created() {
        this.dataDonations();
    },
}
</script>