/* eslint-disable camelcase */

export type Categories = 'popular' | 'playing' | 'rated' | 'upcoming'

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
