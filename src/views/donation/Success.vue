<template>
    <div>
        <div class="container text-center mt-5">
            Pembayaran Donasi Anda <span class="text-primary font-weight-bold">BERHASIL</span>
            <div>
                <button class="btn btn-info px-5 mt-3" @click.prevent="donasi">Kembali</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'donation.success',

    methods: {
        donasi() {
            this.$router.push({name: 'donation.index'});
        }
    }
}
</script>
