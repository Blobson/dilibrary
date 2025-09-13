import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import yaml from 'js-yaml'

import { initialState, stateReducer, INIT_CATALOG } from './State'

export const StateContext = React.createContext({})

const fetchCatalog = async () => {
  const url = process.env.REACT_APP_CATALOG_URL
  const result = await axios({
    method: 'get',
    url: url,
    responseType: 'text'
  })
  return yaml.load(result.data)
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    fetchCatalog().then(data => {
      dispatch({ type: INIT_CATALOG, payload: data })
    })
  }, [dispatch])

  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateProvider
