import { Categories } from '@/lib/types'

export const API_KEY = '60a9888397bcf03e79cd8e43bd7c2f75'
export const BASE_URL = 'https://api.themoviedb.org/3'
export const HOME_CATEGORY_URL = {
  popular: 'movie/popular',
  playing: '/movie/now_playing',
  rated: '/movie/top_rated',
  upcoming: '/movie/upcoming'
}
export const HOME_CATEGORIES: Categories[] = ['popular', 'playing', 'rated', 'upcoming']

export const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/'
export const IMAGE_URL_300 = 'w300/'
export const IMAGE_URL_ORIGINAL = 'original/'
