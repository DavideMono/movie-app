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
    <film-layouts :films="mappedFilms" />
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios'
import { computed, defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'
import { useMovieDbApi } from '@/composables/useMovieDb'
import { useGenres } from '@/composables/useGenres'
import { HOME_CATEGORY_URL, HOME_CATEGORIES, APP_TITLE } from '@/lib/constants'
import { Film, MappedFilm, Categories, CATEGORIES_LABELS } from '@/lib/types'
import { mapFilms } from '@/lib/utils'

export default defineComponent({
  name: 'Home',
  middleware: 'categories',
  setup() {
    const { route, i18n } = useContext()
    const currentCategory: Categories = (route.value.params.category as Categories) ?? 'popular'

    const mappedGenres = useGenres()
    const films = useMovieDbApi<Film[]>({
      url: HOME_CATEGORY_URL[currentCategory],
      mapResponse: (response: AxiosResponse<{ results: Film[] }>) => response.data.results
    })

    onMounted(() => {
      films.fetchData()
    })

    const mappedFilms = computed<MappedFilm[]>(() => {
      if (!films.data.value?.length) return []
      if (!Object.keys(mappedGenres.value).length) return []

      return mapFilms(films.data.value, mappedGenres.value)
    })

    const currentCategoryLabel = computed<string>(() => {
      return CATEGORIES_LABELS[currentCategory]
    })

    return {
      films,
      mappedGenres,
      mappedFilms,
      currentCategory,
      currentCategoryLabel,
      HOME_CATEGORIES: HOME_CATEGORIES.map((c) => ({ label: i18n.t(c), value: c }))
    }
  },
  head() {
    return { title: `${this.$t(this.currentCategory as Categories)} - ${APP_TITLE}` }
  },
  methods: {
    onNavigate(category: Categories) {
      this.$router.push({ path: `/${category}` })
    }
  }
})
</script>
