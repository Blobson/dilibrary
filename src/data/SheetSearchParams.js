import { useLocation, useNavigate, createSearchParams, useSearchParams } from "react-router-dom"

import { filterParam, categoriesParam } from './SearchEngine'


let lastChangeAt = null
const minQuiteInterval = 3000

const useSheetSearchParams = () => {

  const [searchParams, setSearchParams] = useSearchParams({ [filterParam]: "", [categoriesParam]: [] })
  const navigate = useNavigate()
  const location = useLocation()

  const updateSearchParams = (change) => {
    const params = {
      [filterParam]: searchParams.get(filterParam) || "",
      [categoriesParam]: searchParams.getAll(categoriesParam),
      ...change,
    }

    if (location.pathname !== "/sheets") {
      navigate({ pathname: "/sheets", search: createSearchParams(params).toString() })
    } else {
      let replace = true
      if (lastChangeAt && Date.now() - lastChangeAt >= minQuiteInterval) {
        replace = false
      }
      setSearchParams(params, { replace })
      lastChangeAt = Date.now()
    }
  }

  const toggleCategory = (category) => {
    const selectedCategories = searchParams.getAll(categoriesParam)
    if (selectedCategories.includes(category)) {
      updateSearchParams({ [categoriesParam]: selectedCategories.filter(c => c !== category) })
    } else {
      updateSearchParams({ [categoriesParam]: [ ...selectedCategories, category ] })
    }
  }

  const setFilter = (filter) => {
    updateSearchParams({ [filterParam]: filter })
  }

  const filter = searchParams.get(filterParam) || ""
  const selectedCategories = searchParams.getAll(categoriesParam)

  return { filter, selectedCategories, setFilter, toggleCategory }
}

export default useSheetSearchParams
