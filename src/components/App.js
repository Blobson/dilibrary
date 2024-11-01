import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import SheetsList from './Sheets'
import SearchBar from './SearchBar'
import fetchCatalog from '../data/Catalog'
import Header from './Header'

const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  min-width: 30%;
  max-width: 1024px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
`

const Content = styled.div`
  margin: 1em;
  display: flex;
  flex-flow: column;
  justify-content: stretch;
`

const App = () => {
  const [catalog, setCatalog] = useState({ sheets: [], categories: [] })
  const [foundSheets, setFoundSheets] = useState([])

  const onSearchFinished = useCallback(foundSheets => {
    setFoundSheets(foundSheets)
  }, [])

  useEffect(() => {
    fetchCatalog().then(data => {
      setCatalog(data)
      onSearchFinished(data.sheets)
    })
  }, [setCatalog, onSearchFinished])

  return (
    <Wrap>
      <Content>
        <Header />
        <SearchBar sheets={catalog.sheets} foundCount={foundSheets.length} onSearchFinished={onSearchFinished} />
        <SheetsList sheets={foundSheets} />
      </Content>
    </Wrap>
  )
}

export default App
