<template>
  <button class="btn" :class="{ 'btn--active': active, 'btn--rounded': rounded }">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CustomButton',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false
    } as Vue.PropOptions<boolean>,
    rounded: {
      type: Boolean,
      required: false,
      default: false
    } as Vue.PropOptions<boolean>
  }
})
</script>

<style scoped lang="scss">
.btn {
  @apply p-2;
  &:not(&--active) {
    @apply border-2;
  }
  &:hover:not(&--active) {
    @apply bg-gray-300 border-gray-300;
  }
  &:active:not(&--active) {
    @apply bg-gray-500 border-gray-500 text-white;
  }
  &--rounded {
    @apply rounded-md;
  }
  &--active {
    @apply bg-blue-500 text-white;
    &:hover {
      @apply bg-blue-600 text-white;
    }
    &:active {
      @apply bg-blue-900 text-white;
    }
  }
}
</style>
