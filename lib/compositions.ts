import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ref } from '@nuxtjs/composition-api'
import { API_KEY, BASE_URL } from '~/lib/constants'

export const useMovieFetch = <T, R>(
  fetchInstance: NuxtAxiosInstance,
  url: string,
  initialData: T,
  mapResponse: (response: R) => T
) => {
  const data = ref<T>(initialData)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const fetchData = async () => {
    data.value = initialData
    error.value = null
    try {
      const response = await fetchInstance.get<R>(`${BASE_URL}/${url}`, {
        params: { api_key: API_KEY, language: 'en-US' }
      })
      data.value = mapResponse(response.data)
    } catch (responseError) {
      error.value = responseError.toString()
    } finally {
      loading.value = false
    }
  }
  return { data, error, loading, fetchData }
}
