<template>
    <div>
        <div class="mt-4 container detail-container">
            <div class="card">
                <div class="card-header font-weight-bold text-center">MASUKKAN JUMLAH DONASI</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="amount">Jumlah Donasi (Rp.)</label>
                        <input type="number" class="form-control" id="amount" v-model="form.amount">
                    </div>
                    <div class="form-group">
                        <label for="pray">Doa</label>
                        <textarea class="form-control" id="pray" rows="3" v-model="form.pray"></textarea>
                    </div>
                    <button @click.prevent="storeDonation" class="btn btn-primary w-100" v-if="loading == false">
                        LANJUT PEMBAYARAN
                    </button>
                    <button class="btn btn-primary w-100" v-if="loading == true">
                        LOADING ...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions }  from 'vuex';

export default {
    name: 'donation.create',

    data() {
        return {
            form : {
                amount: 0,
                pray: '',
                campaignSlug: this.$route.params.slug
            },
            loading: false
        }
    },

    methods: {
        ...mapActions({
            storeDonationModule: 'donation/storeDonation',
        }),

        storeDonation() {
            if(this.form.amount < 10000) {
                this.$toast.error('Donasi Minimal Rp. 10.000')
                return false;
            } else {
                this.loading = true;
                this.storeDonationModule(this.form)
                .then(() => {
                    this.loading = false;
                    this.$toast.success('Transaksi Berhasil Dibuat!')
                    this.$router.push({name: 'donation.index'})
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                })
            }
        }
    }
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .detail-container {
        width: 50%;
    }
}
</style>