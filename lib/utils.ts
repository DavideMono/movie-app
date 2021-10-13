import { Categories } from '~/lib/types'

export const isValidCategory = (category: string) => {
  const correctCategories = ['popular', 'playing', 'rated', 'upcoming']
  return correctCategories.includes(category as Categories)
}
