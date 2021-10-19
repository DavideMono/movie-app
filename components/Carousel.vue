<template>
  <div class="carousel">
    <p class="carousel-text">Gallery</p>
    <div class="carousel-container">
      <div class="carousel-button carousel-button-left">
        <font-awesome-icon :icon="prevIcon" class="carousel-button--clickable" @click="onMove('prev')" />
      </div>
      <div v-for="(image, index) of images" :key="index" class="carousel-viewer" :class="{ hidden: active !== index }">
        <img :src="image" class="carousel-viewer-image" :alt="'Poster #' + index" />
      </div>
      <div class="carousel-button carousel-button-right">
        <font-awesome-icon :icon="nextIcon" class="carousel-button--clickable" @click="onMove('next')" />
      </div>
    </div>
    <div class="carousel-dots">
      <span
        v-for="(_, index) of images"
        :key="'pull' + index"
        class="carousel-dots-single"
        :class="{ 'carousel-dots-single--active': active === index }"
        @click="onMove(Number(index))"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  name: 'Carousel',
  components: { FontAwesomeIcon },
  props: {
    images: {
      type: Array,
      required: true
    } as Vue.PropOptions<string[]>
  },
  data: () => ({ active: 0, prevIcon: faArrowLeft, nextIcon: faArrowRight }),
  methods: {
    onMove(where: number | 'prev' | 'next') {
      if (where === 'prev') {
        const next = this.active - 1
        if (next < 0) this.active = this.images.length - 1
        else this.active = next
      }
      if (where === 'next') {
        const next = this.active + 1
        if (next > this.images.length - 1) this.active = 0
        else this.active = next
      }
      if (typeof where === 'number') this.active = where
    }
  }
})
</script>

<style scoped lang="scss">
.carousel {
  @apply flex flex-col gap-y-4;
  &-text {
    @apply text-2xl;
  }
  &-container {
    @apply relative flex flex-1 gap-x-2;
  }
  &-viewer {
    @apply w-full rounded-md animate-fade;
    &-image {
      @apply w-full rounded-md;
    }
  }
  &-button {
    @apply absolute h-full px-4 flex items-center text-4xl text-white z-10 select-none;
    &-left {
      @apply left-0;
    }
    &-right {
      @apply right-0;
    }
    &--clickable {
      @apply cursor-pointer;
    }
  }
  &-dots {
    @apply flex justify-center gap-x-2;
    &-single {
      @apply w-4 h-4 border-2 border-black rounded-full cursor-pointer hover:bg-gray-500 transition-colors;
      &--active {
        @apply bg-gray-700;
      }
    }
  }
}
</style>
