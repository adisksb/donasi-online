<template>
  <div>
      <Search />
      <div class="mt-2">
          <Slider />
      </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Slider from '@/components/Slider.vue';

export default {
  name: 'home',

  components: {
      Search,
      Slider
  }
}
</script>
