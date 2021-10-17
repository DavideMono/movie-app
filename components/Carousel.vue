<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex flex-1 gap-x-2">
      <div class="flex items-center">P</div>
      <div
        v-for="(image, index) of images"
        :key="index"
        class="w-full rounded-md"
        :class="{ hidden: active !== index }"
      >
        <img :src="image" class="w-full rounded-md" />
      </div>
      <div class="flex items-center">N</div>
    </div>
    <div class="flex justify-center gap-x-2">
      <span
        v-for="(_, index) of images"
        :key="'pull' + index"
        class="w-4 h-4 border-2 border-black rounded-full cursor-pointer hover:bg-gray-500"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Carousel',
  props: {
    images: {
      type: Array,
      required: true
    } as Vue.PropOptions<string[]>
  },
  data: () => ({ active: 0 })
})
</script>

<style scoped></style>
