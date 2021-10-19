import { BASE_IMAGE_URL, IMAGE_URL_300, IMAGE_URL_ORIGINAL } from '@/lib/constants'
import { Categories, Film, GenresMap, MappedFilm } from '@/lib/types'

export const isValidCategory = (category: string) => {
  const correctCategories = ['popular', 'playing', 'rated', 'upcoming']
  return correctCategories.includes(category as Categories)
}

export const mapFilms = (films: Film[], mappedGenres: GenresMap): MappedFilm[] => {
  return films.map((f) => {
    const mapped: MappedFilm = { ...f, genres: [] }
    mapped.genres = f.genre_ids.map((g) => mappedGenres[g] || 'Unrecognized')
    return mapped
  })
}

export const getImagePath = (type: 'sm' | 'lg' = 'sm') => {
  return `${BASE_IMAGE_URL}${type === 'sm' ? IMAGE_URL_300 : IMAGE_URL_ORIGINAL}`
}
