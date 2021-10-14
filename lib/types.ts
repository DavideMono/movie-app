/* eslint-disable camelcase */

export type Categories = 'popular' | 'playing' | 'rated' | 'upcoming'
export type FilmStatus = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'

export enum CATEGORIES_LABELS {
  'popular' = 'Popular',
  'playing' = 'Now playing',
  'rated' = 'Top rated',
  'upcoming' = 'Upcoming'
}

export type Genres = {
  id: number
  name: string
}

export type Film = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string // as date in YYYY-MM-DD
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MappedFilm = {
  adult: boolean
  backdrop_path: string
  genres: string[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string // as date in YYYY-MM-DD
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type SingleFilm = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: { backdrop_path: string; id: number; name: string; poster_path: string } | null
  budget: number
  genres: Genres[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: { iso_639_1: string; name: string }[]
  status: FilmStatus
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type SingleMappedFilm = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string | null
  budget: number
  genres: string[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: string[]
  production_countries: string[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: string[]
  status: FilmStatus
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
