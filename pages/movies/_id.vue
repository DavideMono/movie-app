<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-wrap">
      <img class="w-full md:w-auto rounded-t-md md:rounded-l-md md:rounded-tr-none" :src="srcUrl" alt="Poster" />
      <div
        class="
          flex flex-col
          gap-y-6
          flex-1
          p-4
          border-l-2 border-r-2 border-b-2
          md:border-t-2 md:border-l-0
          rounded-b-md
          md:rounded-r-md md:rounded-b-none
        "
      >
        <p class="text-4xl font-bold">{{ mappedFilm.title }}</p>
        <p class="flex-1 text-lg">{{ mappedFilm.overview }}</p>
        <p class="text-lg">Genres: {{ mappedGenres }}</p>
        <div class="flex items-center justify-between">
          <span>Release Date: {{ releaseDate }}</span>
          <span>Duration: {{ duration }}</span>
          <span>Budget: $ {{ budget }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-4">
      <p class="text-2xl">Cast</p>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        <div v-for="(c, i) of mappedCast" :key="i" class="border-2 rounded-md">
          <img
            v-if="!!c.path"
            :src="`https://image.tmdb.org/t/p/w300${c.path}`"
            :alt="c.name"
            class="rounded-t-md w-full"
          />
          <p class="font-bold text-center">{{ c.name }}</p>
          <p class="text-center">{{ c.character }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-4">
      <p class="text-2xl">If you like {{ mappedFilm.title }}, you will appreciate</p>
      <film-layouts :films="mappedFilms" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, onMounted, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import { Film, MappedFilm, SingleFilm, SingleMappedFilm, Cast, MappedCast, Genres } from '@/lib/types'

export default Vue.extend({
  name: 'SingleMovie',
  setup() {
    const { route } = useContext()
    const currentMovieId: string = route.value.params.id

    const filmInfo = useMovieDbApi<SingleFilm>({
      url: `/movie/${currentMovieId}`
    })

    const castInfo = useMovieDbApi<Cast[]>({
      url: `/movie/${currentMovieId}/credits`,
      mapResponse: (response) => response.data.cast
    })

    const similarInfo = useMovieDbApi<Film[]>({
      url: `/movie/${currentMovieId}/recommendations`,
      mapResponse: (response) => response.data.results
    })

    const genresInfo = useMovieDbApi<Genres[]>({
      url: 'genre/movie/list',
      mapResponse: (response) => response.data.genres
    })

    onMounted(() => {
      filmInfo.fetchData()
      castInfo.fetchData()
      genresInfo.fetchData()
      similarInfo.fetchData()
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

    const mappedCast = computed<MappedCast[]>(() => {
      if (castInfo.data.value) {
        return castInfo.data.value
          ?.slice(0, 8)
          .map((c) => ({ path: c.profile_path, name: c.name, character: c.character }))
      }
      return []
    })

    const mappedGeneralGenres = computed<{ [key: number]: string }>(() => {
      if (!genresInfo.data.value) return {}
      return genresInfo.data.value.reduce<{ [key: number]: string }>((acc, g) => {
        acc[g.id] = g.name
        return acc
      }, {})
    })

    const mappedFilms = computed<MappedFilm[]>(() => {
      if (!similarInfo.data.value?.length) return []
      if (!Object.keys(mappedGeneralGenres.value).length) return []

      return similarInfo.data.value.map<MappedFilm>((f) => {
        const mappedGenres: string[] = f.genre_ids.map<string>((g) => mappedGeneralGenres.value[g] || 'Unrecognized')
        const mapped: MappedFilm = { ...f, genres: mappedGenres }
        return mapped
      })
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

    return {
      filmInfo,
      mappedFilm,
      mappedGenres,
      mappedCast,
      srcUrl,
      releaseDate,
      budget,
      duration,
      mappedFilms,
      mappedGeneralGenres
    }
  }
})
</script>
