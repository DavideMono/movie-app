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
  @apply flex rounded-l-md rounded-r-md;
  & >>> .btn:first-child {
    @apply rounded-l-md;
  }
  & >>> .btn:last-child {
    @apply rounded-r-md;
  }
}
</style>
