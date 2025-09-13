import initSearchEngine from './SearchEngine'

export const initialState = {
  sheets: [],
  categories: [],
  searchSheets: _ => [[], {}],
}

// Actions
export const INIT_CATALOG = 'init-catalog'

// Reducer
export const stateReducer = (state, action) => {
  switch (action.type) {

    case INIT_CATALOG:
      const { sheets, categories } = action.payload
      return {
        ...state,
        sheets,
        categories: categories,
        searchSheets: initSearchEngine(sheets, categories),
      };

    default:
      return state
  }
}
