<template>
  <div>
      <Search />
      <div class="mt-2">
          <Slider />
      </div>
      <div class="mt-4">
          <Category />
      </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Slider from '@/components/Slider.vue';
import Category from '@/components/Category.vue'

export default {
  name: 'home',

  components: {
      Search,
      Slider,
      Category
  }
}
</script>
