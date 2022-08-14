<template>
    <div class="container-md mt-4">
        <form @submit.prevent="register">
            <div class="card mx-auto">
                <div class="card-header text-center font-weight-bold">
                    REGISTER AKUN
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Nama Lengkap Anda"
                            v-model="form.name"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="email" 
                            class="form-control" 
                            placeholder="Email Valid Anda"
                            v-model="form.email"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="Password"
                            v-model="form.password"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            class="form-control" 
                            placeholder="Konfirmasi Password"
                            v-model="form.password_confirmation"
                        >
                    </div>

                    <div class="mt-2 mb-3">
                        <span class="mt-0 mb-0 text-secondary font-weight-bold">Sudah Punya Akun ?</span>
                        <router-link :to="{name: 'login'}">
                            Silahkan Login
                        </router-link>
                    </div>

                    <button type="submit" class="btn btn-primary w-100" v-if="this.loading == false">REGISTER</button>
                    <button type="submit" class="btn btn-primary w-100" v-if="this.loading == true">LOADING..</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';

export default {
    name: 'register',

    data() {
        return {
            form : {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
        }
    },

    methods: {
        ...mapActions({
            registerAuth: 'auth/register',
        }),

        async register() {
            await this.registerAuth(this.form);

            if (this.errors) {
                if (this.errors.name) {
                    this.$toast.error(this.errors.name[0]);
                }
                if (this.errors.email) {
                    this.$toast.error(this.errors.email[0]);
                }
                if (this.errors.password) {
                    this.$toast.error(this.errors.password[0]);
                }
            } else {
                this.$toast.success(this.success);
            }
        }
    },

    computed: {
        ...mapGetters({
            loading: 'auth/loading',
            btnregisterlogin: 'auth/btnregisterlogin',
            errors: 'auth/errors',
            success: 'auth/success',
        })
    },
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .card {
        width: 50%;
    }
}
</style>