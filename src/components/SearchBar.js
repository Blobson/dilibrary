import React, { useContext, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom"
import styled from 'styled-components'

import useAutoFocus from '../common/AutoFocus'
import CategoryList from './CategoryList'
import { StateContext } from '../data/StateProvider'
import useSheetSearchParams from '../data/SheetSearchParams'

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

const SearchBar = ({ autoFocus = true, autoSelect = true, autoScroll = false }) => {

  const { searchSheets } = useContext(StateContext)
  const { filter, selectedCategories, setFilter, toggleCategory } = useSheetSearchParams()

  const filteredSheets = searchSheets(filter, selectedCategories)
  const searchInput = useAutoFocus(autoFocus)
  const wrapRef = useRef()
  const location = useLocation()

  useEffect(() => {
    if (autoScroll && filteredSheets.length > 0) {
      const rc = wrapRef.current.getBoundingClientRect()
      window.scrollTo({
        top: window.scrollY + rc.top,
        behavior: 'smooth',
      })
    }
  }, [filter, selectedCategories, filteredSheets, autoScroll, searchSheets])

  const onInputChange = (event) => {
    setFilter(event.target.value)
  }

  const selectAll = event => autoSelect && event.target.select()

  return (
    <>
      <SearchWrap ref={wrapRef}>
        <SearchInput
          ref={searchInput}
          name="sheet-search"
          placeholder="Введите автора или название произведения"
          onChange={onInputChange}
          onFocus={selectAll}
          value={filter}
        />
        {location.pathname === "/sheets" &&
          <SheetsCount>найдено: {filteredSheets.length}</SheetsCount>
        }
      </SearchWrap>
      <CategoryList selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
    </>
  )
}

export default SearchBar
