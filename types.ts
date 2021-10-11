/* eslint-disable camelcase */

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
