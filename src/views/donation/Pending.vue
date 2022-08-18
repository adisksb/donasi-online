<template>
    <div>
        <div class="container text-center mt-5">
            Transaksi Anda <span class="text-primary font-weight-bold">BERHASIL</span>,
            Silahkan <span class="text-primary font-weight-bold">Melakukan PEMBAYARAN</span>
            <div>
                <button class="btn btn-info px-5 mt-3" @click.prevent="donasi">Kembali</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'donation.success',

    props: ['pending'],

    methods: {
        donasi() {
            this.$router.push({name: 'donation.index'});
        }
    },

    mounted() {
        if (this.pending) {
            this.$toast.info(this.pending);
        }
    }
}
</script>
