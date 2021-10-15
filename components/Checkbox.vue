<template>
  <div class="flex items-center gap-x-2">
    <span class="flex-1">{{ label }}</span>
    <input type="checkbox" :value="value" @input="$emit('input', $event.target.checked)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      required: true
    } as Vue.PropOptions<boolean>,
    label: {
      type: String,
      required: false,
      default: ''
    } as Vue.PropOptions<string>
  }
})
</script>
