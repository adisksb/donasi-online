<template>
    <div>
        <div class="container text-center mt-5">
            Pembayaran Donasi Anda <span class="text-danger font-weight-bold">GAGAL</span>
            <div>
                <button class="btn btn-info px-5 mt-3" @click.prevent="donation">Kembali</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'donation.failed',

    props: ['failed'],

    methods: {
        donation() {
            this.$router.push({name: 'donation.index'});
        }
    },

    mounted() {
        if (this.failed) {
            this.$toast.error(this.failed);
        }
    }
}
</script>
