<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-wrap border-2 rounded-md">
      <img class="w-full md:w-auto rounded-t-md md:rounded-l-md md:rounded-tr-none" :src="srcUrl" alt="Poster" />
      <div class="flex flex-col gap-y-6 flex-1 p-4">
        <p class="text-4xl font-bold">{{ mappedFilm.title }}</p>
        <p class="flex-1 text-lg">{{ mappedFilm.overview }}</p>
        <p class="text-lg">{{ $t('genres', { genres: mappedGenres }) }}</p>
        <div class="text-lg flex items-center justify-between">
          <p>
            <font-awesome-icon icon="clock" />
            {{ $t('releaseDate', { date: releaseDate }) }}
          </p>
          <p>
            <font-awesome-icon icon="history" />
            {{ $t('duration', { duration }) }}
          </p>
          <p>
            <font-awesome-icon icon="money-bill" />
            {{ $t('budget', { budget }) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-y-4">
      <div class="flex">
        <p class="flex-1 text-2xl">Cast</p>
        <checkbox v-model="allCast" label="Show all cast members" />
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        <div v-for="(c, i) of mappedCast" :key="i" class="border-2 rounded-md">
          <img v-if="!!c.path" :src="c.path" :alt="c.name" class="rounded-t-md w-full" />
          <p class="font-bold text-center">{{ c.name }}</p>
          <p class="text-center">{{ c.character }}</p>
        </div>
      </div>
    </div>
    <carousel :images="mappedImages" />
    <div class="flex flex-col gap-y-4">
      <p class="text-2xl">{{ $t('recommendations', { title: mappedFilm.title }) }}</p>
      <film-layouts :films="mappedFilms" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import { useGenres } from '@/composables/useGenres'
import { Film, MappedFilm, SingleFilm, SingleMappedFilm, Cast, MappedCast, BackdropImages } from '@/lib/types'
import { getImagePath, mapFilms } from '@/lib/utils'
import { APP_TITLE } from '~/lib/constants'

export default defineComponent({
  name: 'SingleMovie',
  setup() {
    const { route } = useContext()
    const allCast = ref<boolean>(false)
    const currentMovieId: string = route.value.params.id

    const filmInfo = useMovieDbApi<SingleFilm>({
      url: `/movie/${currentMovieId}`
    })

    const castInfo = useMovieDbApi<Cast[]>({
      url: `/movie/${currentMovieId}/credits`,
      mapResponse: (response) => response.data.cast
    })

    const imagesInfo = useMovieDbApi<BackdropImages[]>({
      url: `/movie/${currentMovieId}/images`,
      mapResponse: (response) => response.data.backdrops,
      config: { params: { language: null } }
    })

    const similarInfo = useMovieDbApi<Film[]>({
      url: `/movie/${currentMovieId}/recommendations`,
      mapResponse: (response) => response.data.results
    })

    const mappedGeneralGenres = useGenres()

    onMounted(() => {
      filmInfo.fetchData()
      castInfo.fetchData()
      similarInfo.fetchData()
      imagesInfo.fetchData()
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
        const castArr = allCast.value ? castInfo.data.value : castInfo.data.value.slice(0, 8)
        return castArr.map((c) => ({
          path: c.profile_path ? getImagePath() + c.profile_path : null,
          name: c.name,
          character: c.character
        }))
      }
      return []
    })

    const mappedFilms = computed<MappedFilm[]>(() => {
      if (!similarInfo.data.value?.length) return []
      if (!Object.keys(mappedGeneralGenres.value).length) return []

      return mapFilms(similarInfo.data.value, mappedGeneralGenres.value)
    })

    const srcUrl = computed<string>(() => {
      if (filmInfo.data.value) return `${getImagePath()}${filmInfo.data.value?.poster_path}`
      return ''
    })

    const mappedGenres = computed<string>(() => {
      if (mappedFilm.value.genres) return mappedFilm.value.genres.join(', ')
      return ''
    })

    const mappedImages = computed<string[]>(() => {
      if (imagesInfo.data.value) return imagesInfo.data.value.map((b) => getImagePath('lg') + b.file_path)
      return []
    })

    const title = computed<string>(() => {
      if (filmInfo.data.value) return filmInfo.data.value.title
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
      allCast,
      filmInfo,
      mappedFilm,
      mappedGenres,
      mappedCast,
      mappedImages,
      srcUrl,
      title,
      releaseDate,
      budget,
      duration,
      mappedFilms,
      mappedGeneralGenres
    }
  },
  head() {
    return { title: this.title ? `${this.title} - ${APP_TITLE}` : `Loading... - ${APP_TITLE}` }
  }
})
</script>
