<template>
  <div class="flex flex-col gap-y-4">
    <p class="text-2xl">Results for: {{ currentSearch }}</p>
    <film-layouts :films="mappedFilms" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, onMounted, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import { Film } from '@/lib/types'
import { useGenres } from '~/composables/useGenres'
import { mapFilms } from '~/lib/utils'

export default Vue.extend({
  name: 'SearchResult',
  setup() {
    const { route, redirect } = useContext()
    const currentSearch: string | undefined = route.value.params.text
    if (!currentSearch) redirect('/')

    const mappedGenres = useGenres()
    const searchResults = useMovieDbApi<Film[]>({
      url: '/search/movie',
      config: { params: { query: currentSearch } },
      mapResponse: (response) => response.data.results
    })

    onMounted(() => {
      searchResults.fetchData()
    })

    const mappedFilms = computed(() => {
      if (!searchResults.data.value?.length) return []
      if (!Object.keys(mappedGenres.value).length) return []

      return mapFilms(searchResults.data.value, mappedGenres.value)
    })

    return {
      currentSearch,
      mappedFilms
    }
  }
})
</script>
