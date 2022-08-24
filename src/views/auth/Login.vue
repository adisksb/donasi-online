<template>
    <div class="container-md mt-4">
        <form @submit.prevent="login">
            <div class="card mx-auto">
                <div class="card-header text-center font-weight-bold">
                    LOGIN AKUN
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <input 
                            type="email" 
                            class="form-control" 
                            placeholder="Email Valid Anda"
                            v-model="form.email"
                        >
                    </div>
                    <div class="form-group mb-1">
                        <input 
                            id="password"
                            type="password" 
                            class="form-control" 
                            placeholder="Password"
                            v-model="form.password"
                        >
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="checkbox" v-model="checked" @change="showPassword">
                        <label class="form-check-label" for="show-password">Show Password</label>
                    </div>

                    <div class="mt-2 mb-3">
                        <span class="mt-0 mb-0 text-secondary font-weight-bold">Belum Punya Akun ?</span>
                        <router-link :to="{name: 'register'}">
                            Silahkan Register
                        </router-link>
                    </div>

                    <button type="submit" class="btn btn-primary w-100" v-if="this.loading == false">LOGIN</button>
                    <button type="submit" class="btn btn-primary w-100" v-if="this.loading == true">LOADING..</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';

export default {
    name: 'login',

    data() {
        return {
            form : {
                email: '',
                password: '',
            },
            checked: false,
        }
    },

    methods: {
        ...mapActions({
            loginAuth: 'auth/login',
        }),

        showPassword() {
            let password = document.getElementById('password');
            if (this.checked) {
                password.setAttribute('type', 'text');
            } else {
                password.setAttribute('type', 'password');
            }
        },

        async login() {
            await this.loginAuth(this.form);

            if (this.errors) {
                if (this.errors.email) {
                    this.$toast.error(this.errors.email[0]);
                } else if (this.errors.password) {
                    this.$toast.error(this.errors.password[0]);
                } else {
                    this.$toast.error('Periksa Kembali Email dan Password Anda');
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