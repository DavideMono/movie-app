import { Categories, Film, GenresMap, MappedFilm } from '~/lib/types'

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
