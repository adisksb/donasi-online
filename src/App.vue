<template>
  <div id="app" class="bg-container vh-100">
      <Navbar> </Navbar>
      <div class="pb-3">
          <router-view></router-view>
      </div>
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
