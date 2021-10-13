import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ref } from '@nuxtjs/composition-api'
import { API_KEY, BASE_URL } from '~/lib/constants'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  config.params = {
    'api_key': API_KEY,
    language: 'en-US',
    ...config.params
  }
  return config
});

type MovieDbAPi<T> = {
  url: string
  mapResponse?: (response: AxiosResponse<any>) => T
  config?: AxiosRequestConfig
}

export const useMovieDbApi = <T>({
  url,
  mapResponse,
  config
}: MovieDbAPi<T>) => {
  const data = ref<T>()
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchData = async () => {
    error.value = null
    try {
      const response = await api.get<T>(url, config)
      data.value = mapResponse ? mapResponse(response) : response.data
    } catch (responseError) {
      console.error(responseError)
      error.value = (responseError as AxiosError).toString()
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
