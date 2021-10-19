<template>
  <div class="container mx-auto p-4 flex flex-wrap gap-y-4 items-center">
    <div class="flex items-center cursor-pointer" @click="onHome">
      <img class="w-8" src="/movie-icon.svg" alt="Movie Icon" />
      <span class="text-4xl font-bold">Movie Browser</span>
    </div>
    <div class="flex-1" />
    <input
      class="border-2 px-2 py-1 text-2xl rounded-md focus:outline-none focus:border-blue-500 w-full md:w-auto"
      :placeholder="$t('searchPlaceholder')"
      :value="value"
      @input="(e) => onUpdate(e.target.value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash-es'

export default Vue.extend({
  name: 'Header',
  data: () => ({ value: '' }),
  watch: {
    $route(value) {
      const isSearching = value.path.startsWith('/search')
      if (!isSearching) {
        this.value = ''
      }
    }
  },
  methods: {
    onUpdate(nextValue: string) {
      this.value = nextValue
      this.onDebouncedSearch(nextValue, this.$router)
    },
    onDebouncedSearch: debounce((nextSearch: string, router: any) => {
      router.push({ path: `/search/${nextSearch}` })
    }, 500),
    onHome() {
      this.$router.push({ path: '/' })
    }
  }
})
</script>
