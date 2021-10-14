<template>
  <div class="flex flex-col gap-y-4">
    <ButtonGroup>
      <Button
        v-for="(category, index) of HOME_CATEGORIES"
        :key="index"
        :active="category.value === currentCategory"
        @click="() => onNavigate(category.value)"
      >
        {{ category.label }}
      </Button>
    </ButtonGroup>
    <div class="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <movie v-for="(film, index) of mappedFilms" :key="index" :film="film" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AxiosResponse } from 'axios'
import { computed, onMounted, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import Movie from '@/components/Movie.vue'
import { HOME_CATEGORY_URL, HOME_CATEGORIES } from '@/lib/constants'
import { Film, MappedFilm, Genres, Categories, CATEGORIES_LABELS } from '@/lib/types'
import { isValidCategory } from '~/lib/utils'

export default Vue.extend({
  name: 'Home',
  components: { Movie },
  setup() {
    const { route, redirect } = useContext()
    const currentCategory: Categories = (route.value.params.category as Categories) ?? 'popular'
    if (currentCategory && !isValidCategory(currentCategory)) {
      redirect('/')
    }
    const genres = useMovieDbApi<Genres[]>({
      url: 'genre/movie/list',
      mapResponse: (response: AxiosResponse<{ genres: Genres[] }>) => response.data.genres
    })
    const films = useMovieDbApi<Film[]>({
      url: HOME_CATEGORY_URL[currentCategory],
      mapResponse: (response: AxiosResponse<{ results: Film[] }>) => response.data.results
    })

    onMounted(() => {
      genres.fetchData()
      films.fetchData()
    })

    const mappedGenres = computed(() => {
      if (!genres.data.value?.length) return {}
      return genres.data.value.reduce<{ [key: number]: string }>((acc, g) => {
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

    const currentCategoryLabel = computed(() => {
      return CATEGORIES_LABELS[currentCategory]
    })

    return {
      genres,
      films,
      mappedGenres,
      mappedFilms,
      currentCategory,
      currentCategoryLabel,
      HOME_CATEGORIES: HOME_CATEGORIES.map((c) => ({ label: CATEGORIES_LABELS[c], value: c }))
    }
  },
  methods: {
    onNavigate(category: Categories) {
      this.$router.push({ path: `/${category}` })
    }
  }
})
</script>
