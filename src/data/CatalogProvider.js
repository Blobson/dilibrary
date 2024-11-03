import React, { useEffect, useState } from 'react'
import axios from 'axios'
import yaml from 'js-yaml'

export const CatalogContext = React.createContext({})

const fetchCatalog = async () => {
  const url = process.env.REACT_APP_CATALOG_URL
  const result = await axios({
    method: 'get',
    url: url,
    responseType: 'text'
  })
  return yaml.load(result.data)
}

const CatalogProvider = ({ children }) => {
  const [sheets, setSheets] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredSheets, setFilteredSheets] = useState([])

  useEffect(() => {
    fetchCatalog().then(data => {
      setSheets(data.sheets)
      setCategories(data.categories)
      setFilteredSheets(data.sheets)
    })
  }, [setSheets, setCategories, setFilteredSheets])

  const catalog = {
    sheets,
    categories,
    filteredSheets,
    setFilteredSheets,
  }

  return (
    <CatalogContext.Provider value={catalog}>
      {children}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
