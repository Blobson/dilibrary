import initSearchEngine from './SearchEngine'

export const initialState = {
  sheets: [],
  categories: [],
  searchSheets: _ => [],
}

// Actions
export const INIT_CATALOG = 'init-catalog'
// export const TOGGLE_CATEGORY = 'toggle-category'

// Reducer
export const stateReducer = (state, action) => {
  switch (action.type) {

    case INIT_CATALOG:
      const { sheets, categories } = action.payload
      return {
        ...state,
        sheets,
        categories: categories.map(category => ({
          name: category,
        })),
        searchSheets: initSearchEngine(action.payload.sheets),
      };

    // case TOGGLE_CATEGORY:
    //   const { category, updateSearchParams } = action.payload
    //   const newState = {
    //     ...state,
    //     categories: state.categories.map(c => {
    //       return c.name !== category ? c : {
    //         ...c,
    //         selected: !c.selected
    //       }
    //     })
    //   }

    //   updateSearchParams({ [categoriesParam]: newState.categories.filter(c => c.selected).map(c => c.name) })

    //   return newState

    default:
      return state
  }
}
