<template>
  <div class="rounded-md border-2 cursor-pointer hover:transform hover:-translate-y-4 duration-200 hover:duration-200">
    <img class="w-full rounded-t-md" :src="srcUrl" :alt="film.title" />
    <div class="p-2">
      <div class="flex items-center">
        <div class="flex-1">
          <span class="text-lg font-bold"> {{ film.title }}</span>
        </div>
        <div class="border-2 rounded-full p-2">{{ rating }}</div>
      </div>
      <div>{{ genres }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MappedFilm } from '~/types'

export default Vue.extend({
  name: 'Movie',
  props: {
    film: {
      type: Object,
      required: true
    } as Vue.PropOptions<MappedFilm>
  },
  computed: {
    srcUrl(): string {
      return 'https://image.tmdb.org/t/p/w300' + this.film.poster_path
    },
    rating(): string {
      return this.film.vote_average.toFixed(1)
    },
    genres(): string {
      return this.film.genres.join(', ')
    }
  }
})
</script>

<style scoped></style>
