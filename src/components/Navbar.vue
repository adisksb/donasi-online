<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <router-link :to="{name: 'home'}" class="navbar-brand" href="#">
                    Donasi Kita
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link :to="{name: 'home'}" class="nav-link" exact>
                                Beranda
                            </router-link>
                        </li>
                         <li class="nav-item">
                            <router-link :to="{name: 'category.index'}" class="nav-link">
                                Category
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'campaign.index'}" class="nav-link">
                                Campaign
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'donation.index'}" class="nav-link">
                                Donasi Saya
                            </router-link>
                        </li>
                    </ul>
                    <Search />
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link 
                                :to="{name: 'login'}" 
                                class="nav-link"
                                v-if="!authenticated"
                            >
                                Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link 
                                :to="{name: 'register'}" 
                                class="nav-link"
                                v-if="!authenticated"
                            >
                                Register
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link 
                                :to="{name: 'dashboard'}" 
                                class="nav-link"
                                v-if="authenticated"
                            >
                                My Account
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters }  from 'vuex';
import Search from '@/components/Search.vue';

export default {
    name: 'navbar',

    components: {
        Search,
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
        })
    },
}
</script>

<style>

</style>