import React, { useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate, useSearchParams, createSearchParams } from "react-router-dom"
import styled from 'styled-components'

import useAutoFocus from '../common/AutoFocus'
import useSearchEngine from '../data/SearchEngine'
import { CatalogContext } from '../data/CatalogProvider'

const SearchWrap = styled.div`
  padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  flex-basis: 100%;

  position: sticky;
  top: 0px;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%);
`

const SearchInput = styled.input`
  font-size: 1em;
  outline: none;
  border: 2px solid #555;
  border-radius: 0.3em;
  padding: 0.5em;
  &:focus {
    border-color: rgba(255, 218, 91, 0.83);
  }
`

const SheetsCount = styled.div`
  margin-top: 0.3em;
  text-align: right;
  font-size: 0.7em;
`

const searchParam = "q"

let lastChangeAt = null
const minQuiteInterval = 3000

const SearchBar = ({ autoFocus = true, autoSelect = true, autoScroll = false }) => {

  const { sheets, filteredSheets, setFilteredSheets } = useContext(CatalogContext)
  const searchSheets = useSearchEngine(sheets)
  const searchInput = useAutoFocus(autoFocus)
  const wrapRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  const [queryParams, setQueryParams] = useSearchParams()

  useEffect(() => {
    const matchingSheets = searchSheets(queryParams.get(searchParam))
    setFilteredSheets(matchingSheets)

    if (autoScroll && matchingSheets.length > 0) {
      const rc = wrapRef.current.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + rc.top,
        behavior: 'smooth',
      })
    }

  }, [queryParams, setFilteredSheets, searchSheets, autoScroll])

  const onInputChange = (event) => {
    const queryParams = { [searchParam]: event.target.value }
    if (location.pathname !== "/sheets" && event.target.value) {
      navigate({ pathname: "/sheets", search: createSearchParams(queryParams).toString() })
    } else {
      let replace = true
      if (lastChangeAt && Date.now() - lastChangeAt >= minQuiteInterval) {
        replace = false
      }
      setQueryParams(queryParams, { replace })
      lastChangeAt = Date.now()
    }
  }

  const selectAll = event => autoSelect && event.target.select()

  return (
    <SearchWrap ref={wrapRef}>
      <SearchInput
        ref={searchInput}
        name="sheet-search"
        placeholder="Введите автора, название произведения или категорию"
        onChange={onInputChange}
        onFocus={selectAll}
        value={queryParams.get(searchParam) || ""}
      />
      <SheetsCount>найдено: {filteredSheets.length}</SheetsCount>
    </SearchWrap>
  )
}

export default SearchBar
