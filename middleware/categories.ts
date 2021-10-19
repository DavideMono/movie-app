import { Middleware } from '@nuxt/types'
import { Categories } from '@/lib/types'
import { isValidCategory } from '@/lib/utils'

const categories: Middleware = ({ route, redirect }) => {
  const currentCategory: Categories | undefined = route.params.category as Categories
  if (currentCategory && !isValidCategory(currentCategory)) {
    redirect('/')
  }
}

export default categories
