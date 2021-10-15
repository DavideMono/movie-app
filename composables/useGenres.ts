import { onMounted, ref, watch } from '@nuxtjs/composition-api'
import { AxiosResponse } from 'axios'
import { useMovieDbApi } from './useMovieDb'
import { Genres, GenresMap } from '@/lib/types'

const genres = ref<GenresMap>({})

export const useGenres = () => {
  const genresInfo = useMovieDbApi<Genres[]>({
    url: 'genre/movie/list',
    mapResponse: (response: AxiosResponse<{ genres: Genres[] }>) => response.data.genres
  })

  onMounted(() => {
    if (!Object.keys(genres.value).length) {
      genresInfo.fetchData()
    }
  })

  watch(genresInfo.data, (next) => {
    if (next !== undefined) {
      genres.value = next.reduce<GenresMap>((acc, g) => {
        acc[g.id] = g.name
        return acc
      }, {})
    }
  })

  return genres
}
