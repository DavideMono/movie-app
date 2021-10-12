<template>
  <div class="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-4">
    <movie v-for="(film, index) of mappedFilms" :key="index" :film="film" />
  </div>
</template>

<script lang="ts">
import { useContext } from '@nuxtjs/composition-api'
import Movie from '~/components/Movie'
import { useMovieFetch } from '~/lib/compositions'
import { Film, MappedFilm, Genres } from '~/types'

export default {
  name: 'Movies',
  components: { Movie },
  setup() {
    const { $axios } = useContext()
    const {
      data: genres,
      loading: genresLoading,
      error: genresError,
      fetchData: fetchGenres
    } = useMovieFetch<Genres[], { genres: Genres[] }>($axios, 'genre/movie/list', [], (response) => response.genres)
    const {
      data: films,
      loading: filmsLoading,
      error: filmsError,
      fetchData: fetchFilms
    } = useMovieFetch<Film[], { results: Film[] }>($axios, 'movie/popular', [], (response) => response.results)
    return { genres, genresLoading, genresError, fetchGenres, films, filmsLoading, filmsError, fetchFilms }
  },
  computed: {
    mappedGenres() {
      if (this.genres.length) {
        return this.genres.reduce((acc, g) => {
          acc[g.id] = g.name
          return acc
        }, {})
      }
      return {}
    },
    mappedFilms() {
      if (this.films.length && this.genres.length) {
        return this.films.map<MappedFilm>((f) => {
          const mapped: MappedFilm = { ...f }
          mapped.genres = f.genre_ids.map((g) => this.mappedGenres[g] ?? 'Unrecognized')
          return mapped
        })
      }
      return []
    }
  },
  async created() {
    await this.fetchGenres()
    await this.fetchFilms()
  }
}
</script>

<style scoped></style>
