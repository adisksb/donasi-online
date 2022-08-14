<template>
    <div class="container mt-5">
        <div class="mx-auto text-center border p-3 dashboard-container" v-if="user">
            <img :src="user.avatar" class="rounded-circle img-thumbnail" :alt="user.name">
            <p>{{ user.name }}</p>
            <button class="btn btn-primary px-5 btn-sm">Edit Profile</button>
            <hr>

            <div>
                <button class="btn-profile btn btn-sm btn-info px-3">Donasi Saya</button>
                <hr>
                <button class="btn-profile btn btn-sm btn-success px-3">Profile Saya</button>
                <hr>
                <button class="btn-profile btn btn-sm btn-secondary px-3">Ubah Password</button>
                <hr>
                <button class="btn-profile btn btn-sm btn-danger px-3" @click.prevent="logout">
                    Logout
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions }  from 'vuex';

export default {
    name: 'dashboard',

    data() {
        return {
            user : null,
            token : localStorage.getItem('token')
        }
    },

    methods: {
         ...mapActions({
            logoutAuth: 'auth/logout',
        }),

        async getUser () {
            const config = {
                method: 'get',
                url : 'user',
                headers: {
                    'Authorization' : 'Bearer ' + this.token,
                }
            }

            await axios(config)      
            .then((response) => {
                this.user = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },

        async logout() {
            console.log('keluar');
            await this.logoutAuth();
            this.$router.push({ name: 'login'});
            this.$toast.success("Logout Berhasil!");
        }
    },

    created() {
        this.getUser();
    }
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .dashboard-container {
        width: 40%;
    }

    img {
        width: 150px;
        height: 150px;
        background-size: cover;
    }
}

@media (max-width: 767px) { 
    .btn-profile {
        width: 100%;
    }

    img {
        width: 80px;
        height: 80px;
        background-size: cover;
    }
}
</style>