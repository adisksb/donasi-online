<template>
    <div class="container mt-4">
        <form @submit.prevent="updatePassword">
            <div class="form-container mx-auto">
                <div class="form-group">
                    <label for="password">Password Baru</label>
                    <input 
                        type="password" 
                        class="form-control"
                        id="password"
                        name="password"
                        v-model="form.password"
                    >
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Password Baru</label>
                    <input 
                        type="password_confirmation" 
                        class="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        v-model="form.password_confirmation"
                    >
                </div>

                <button type="submit" class="btn btn-primary w-100" v-if="loading == false">
                    UPDATE PASSWORD
                </button>
                <button type="submit" class="btn btn-primary w-100" v-if="loading == true">
                    LOADING ..
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters }  from 'vuex';

export default {
    name: 'update.password',

    data() {
        return {
            form : {
                password : '',
                password_confirmation : '',
            },
            loading : false,
        }
    },

    methods: {
        ...mapActions({
            updatePasswordModule: 'profile/updatePassword',
        }),

        async updatePassword() {
            this.loading = true;
            try {
                let data = new FormData();
                data.append('password', this.form.password);
                data.append('password_confirmation', this.form.password_confirmation);

                await this.updatePasswordModule(data);
                this.loading = false;      
                if (this.errors) {
                    this.$toast.error(this.errors.password[0]);
                }  
                if (this.success !== '') {
                    this.$toast.success(this.success);
                }   
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        }
    },

    computed: {
        ...mapGetters({
            errors : 'profile/errors',
            success : 'profile/success',
        })
    },
}
</script>

<style scoped>
@media (min-width: 768px) { 
    .form-container {
        width: 40%;
    }
}
</style>