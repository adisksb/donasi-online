<template>
    <div class="container mt-4">
        <h4 class="text-center">Profile Saya</h4>

        <form method="POST" enctype="multipart/form-data" @submit.prevent="updateProfile">
            <div class="border w-50 mx-auto p-3">
                <div class="text-center mx-auto">
                    <img :src="data.avatar" class="mx-auto rounded-circle img-thumbnail" :alt="data.name">
                </div>
                <div class="form-group w-50 mx-auto">
                    <label for="file">Pilih Photo</label>
                    <input 
                        type="file" 
                        class="form-control" 
                        ref="file" 
                        @change="onFileChange"
                    >
                </div>

                <div class="mt-4">
                    <div class="form-group">
                        <label for="name">Nama Lengkap</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            v-model="form.name"
                        >
                    </div>
                    <div class="form-group">
                        <label for="email">Alamat Email</label>
                        <input readonly type="text" class="form-control" v-model="form.email">
                    </div>
                </div>

                <button type="submit" class="mt-4 btn btn-block btn-primary" v-if="loading == false">
                    UPDATE PROFILE
                </button>
                <button type="submit" class="mt-4 btn btn-block btn-primary" v-if="loading == true">
                    LOADING ...
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions }  from 'vuex';

export default {
    name: 'profile',

    data() {
        return {
            data : {},
            form : {
                name: '',
                email: '',
            },
            imageUpload : null,
            loading : false,
        }
    },

    methods: {
        ...mapActions({
            getProfileModule: 'profile/getProfile',
            updateProfileModule: 'profile/updateProfile',
        }),

        async dataProfile() {
            try {
                await this.getProfileModule();
                this.data = this.$store.getters['profile/profile'];
                this.form.name = this.data.name;
                this.form.email = this.data.email;
            } catch (error) {
                console.log(error);
            }
        },

        onFileChange(){  
            this.imageUpload = this.$refs.file.files[0];

            if (this.imageUpload !== null || this.imageUpload !== '') {
                if (!this.imageUpload.type.match('image.*')) {
                    this.imageUpload= null;
                    this.$toast.error("Extensi File Harus Image!");
                }
            } else {
                this.$toast.error("Anda tidak mengupload image!");
            }

        },

        async updateProfile() {
            this.loading = true;
            try {
                let data = new FormData();
                data.append('name', this.form.name);
                data.append('avatar', this.imageUpload);
                await this.updateProfileModule(data);
                this.$toast.success(`Berhasil Ubah Profile`);
                this.loading = false;
                this.$router.push({name: 'dashboard'});                 
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },

    created() {
        this.dataProfile();
    },
}
</script>

<style scoped>
@media (min-width: 768px) {
    img {
        width: 150px;
        height: 150px;
        background-size: cover;
    }
}

@media (max-width: 767px) {
    img {
        width: 80px;
        height: 80px;
        background-size: cover;
    }
}
</style>