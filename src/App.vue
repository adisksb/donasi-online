<template>
  <div id="app" class="pb-5 bg-container vh-100">
      <Navbar> </Navbar>
      <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',

  components: {
      Navbar,
  },
}
</script>

<style>
/* .bg-container {
    background: #A2B5BB;
} */
</style>
