<template>
  <div class="flex">
    <img :src="srcUrl" alt="Poster" />
    <div class="flex flex-col gap-y-6 flex-1 p-4 border-t-2 border-r-2 border-b-2 rounded-r-md">
      <p class="text-4xl font-bold">{{ mappedFilm.title }}</p>
      <p class="flex-1 text-lg">{{ mappedFilm.overview }}</p>
      <p class="flex-1 text-lg">Genres: {{ mappedGenres }}</p>
      <div class="flex items-center justify-between">
        <span>Release Date: {{ releaseDate }}</span>
        <span>Duration: {{ duration }}</span>
        <span>Budget: $ {{ budget }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, onMounted, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import { SingleFilm, SingleMappedFilm } from '@/lib/types'

export default Vue.extend({
  name: 'SingleMovie',
  setup() {
    const { route } = useContext()
    const currentMovieId: string = route.value.params.id

    const filmInfo = useMovieDbApi<SingleFilm>({
      url: `/movie/${currentMovieId}`
    })

    onMounted(() => {
      filmInfo.fetchData()
    })

    const mappedFilm = computed<Partial<SingleMappedFilm>>(() => {
      if (filmInfo.data.value) {
        const current = filmInfo.data.value
        const mappedCollection = current.belongs_to_collection?.name || null
        const mappedGenres = current.genres.map((g) => g.name)
        const mappedCompanies = current.production_companies.map((c) => c.name)
        const mappedPlaces = current.production_countries.map((c) => c.name)
        const mappedLanguages = current.spoken_languages.map((l) => l.name)
        const next: SingleMappedFilm = {
          ...current,
          belongs_to_collection: mappedCollection,
          genres: mappedGenres,
          production_companies: mappedCompanies,
          production_countries: mappedPlaces,
          spoken_languages: mappedLanguages
        }
        return next
      }
      return {}
    })

    const srcUrl = computed<string>(() => {
      if (filmInfo.data.value) return `https://image.tmdb.org/t/p/w300${filmInfo.data.value?.poster_path}`
      return ''
    })

    const mappedGenres = computed<string>(() => {
      if (mappedFilm.value.genres) return mappedFilm.value.genres.join(', ')
      return ''
    })

    const releaseDate = computed<string>(() => {
      if (filmInfo.data.value) return new Date(filmInfo.data.value?.release_date).toLocaleDateString('it')
      return ''
    })

    const budget = computed<string>(() => {
      if (filmInfo.data.value) return filmInfo.data.value?.budget.toLocaleString('it')
      return ''
    })

    const duration = computed(() => {
      let time = filmInfo.data.value?.runtime
      if (time) {
        let finalFormat = ''
        let hours = 0
        while (time >= 60) {
          hours += 1
          time -= 60
        }
        if (hours > 0) finalFormat += `${hours} h `
        if (time !== 0) finalFormat += `${time} m`
        return finalFormat
      }
      return ''
    })

    return { filmInfo, mappedFilm, mappedGenres, srcUrl, releaseDate, budget, duration }
  }
})
</script>

<style scoped></style>
