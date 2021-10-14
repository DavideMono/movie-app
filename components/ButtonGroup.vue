<template>
  <div class="btn-group">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'CustomButtonGroup'
})
</script>

<style scoped lang="scss">
.btn-group {
  @apply inline-flex border-2 rounded-l-md rounded-r-md;
  ::v-deep .btn {
    @apply border-0;
  }
  ::v-deep .btn:not(.btn:last-child) {
    @apply border-r-2;
  }
  ::v-deep .btn:first-child {
    @apply rounded-l-md;
  }
  ::v-deep .btn:last-child {
    @apply rounded-r-md;
  }
}
</style>
