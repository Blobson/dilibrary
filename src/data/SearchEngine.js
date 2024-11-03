import { useMemo } from 'react'
import MiniSearch from 'minisearch'

const miniSearch = new MiniSearch({
  fields: ['title', 'authors', 'mod', 'categories'],
  searchOptions: {
    boost: {'title': 2, 'authors': 1.7, 'mod': 1},
  },
})

const useSearchEngine = data =>
  useMemo(() => {
    miniSearch.removeAll()
    miniSearch.addAll(data)

    const searchSheets = query => {
      if (query && query.length) {
        const searchResults = miniSearch.search(query, { prefix: true })
        return searchResults.map(it => data.find(item => item.id === it.id))
      }
      return data
    }

    return searchSheets
  }, [data])

export default useSearchEngine
