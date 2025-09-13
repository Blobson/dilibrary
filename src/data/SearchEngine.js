import MiniSearch from 'minisearch'

const miniSearch = new MiniSearch({
  fields: ['title', 'authors', 'mod'],
  searchOptions: {
    boost: {'title': 2, 'authors': 1.7, 'mod': 1},
  },
})

export const filterParam = "q"
export const categoriesParam = "c"

const categoriesMatch = (sheet, selectedCategories) => {
  return !selectedCategories || (
    sheet.categories && selectedCategories.every(it => sheet.categories.includes(it))
  )
}

const initSearchEngine = (sheets, categories) => {
  miniSearch.removeAll()
  miniSearch.addAll(sheets)

  const searchSheets = (filter, selectedCategories) => {
    let matchingSheets = sheets

    if (filter && filter.length) {
      const searchResults = miniSearch.search(filter, { prefix: true })
      matchingSheets = matchingSheets.filter(sheet =>
        searchResults.find(res => res.id === sheet.id) !== undefined
      )
    }

    if (selectedCategories) {
      matchingSheets = matchingSheets.filter(sheet => categoriesMatch(sheet, selectedCategories))
    }

    const categoryCounters = categories.reduce((acc, category) => {
      acc[category] = matchingSheets.filter(it => it.categories.includes(category)).length
      return acc
    }, {})

    return [ matchingSheets, categoryCounters ]
  }

  return searchSheets
}

export default initSearchEngine
