<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <movie v-for="(film, index) of mappedFilms" :key="index" :film="film" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AxiosResponse } from 'axios'
import { computed, onMounted } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import Movie from '@/components/Movie.vue'
import { Film, MappedFilm, Genres } from '@/types'

export default Vue.extend({
  name: 'Home',
  components: { Movie },
  setup() {
    const genres = useMovieDbApi<Genres[]>({
      url: 'genre/movie/list',
      mapResponse: (response: AxiosResponse<{ genres: Genres[] }>) => response.data.genres
    })
    const films = useMovieDbApi<Film[]>({
      url: 'movie/popular', 
      mapResponse: (response: AxiosResponse<{ results: Film[] }>) => response.data.results
    })

    onMounted(() => {
      genres.fetchData()
      films.fetchData()
    })

    const mappedGenres = computed(() => {
      if (!genres.data.value?.length) return {}
      return genres.data.value.reduce<{[key: number]: string}>((acc, g) => {
          acc[g.id] = g.name
          return acc
        }, {})
    })

    const mappedFilms = computed(() => {
      if (!films.data.value?.length) return []
      if (!Object.keys(mappedGenres.value).length) return []

      return films.data.value.map<MappedFilm>((f) => {
          const mapped: MappedFilm = { ...f, genres: [] }
          mapped.genres = f.genre_ids.map((g) => mappedGenres.value[g] || 'Unrecognized')
          return mapped
        })
    })

    return {
      genres,
      films,
      mappedGenres,
      mappedFilms
    }
  },
})
</script>
