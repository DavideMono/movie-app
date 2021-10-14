<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    <movie v-for="(film, index) of films" :key="index" :film="film" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MappedFilm } from '@/lib/types'

export default Vue.extend({
  name: 'FilmLayouts',
  props: {
    films: {
      type: Array,
      required: true
    } as Vue.PropOptions<MappedFilm[]>
  }
})
</script>
