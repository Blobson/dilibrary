import React, { useMemo } from 'react'
import styled from 'styled-components'
import MiniSearch from 'minisearch'

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

const miniSearch = new MiniSearch({
  fields: ['title', 'authors', 'mod', 'categories'],
  boost: {'title': 2, 'authors': 1.7, 'mod': 1.5}
})

const onFocus = event => event.target.select()

const SearchBar = ({ sheets, foundCount, onSearchFinished }) => {

  const processQuery = useMemo(() => {
    miniSearch.removeAll()
    miniSearch.addAll(sheets)
    const searchSheets = query => {
      if (query) {
        const searchResults = miniSearch.search(query, { prefix: true })
        return searchResults.map(it => sheets.find(sheet => sheet.id === it.id))
      }
      return sheets
    }
    return searchSheets
  }, [sheets])

  const onInputChange = (event) => {
    const matchingSheets = processQuery(event.target.value)
    onSearchFinished(matchingSheets)
}

  return (
    <SearchWrap>
      <SearchInput
        name="sheet-search"
        placeholder="Введите автора, название произведения или категорию"
        onChange={onInputChange}
        onFocus={onFocus}
      />
      <SheetsCount>найдено: {foundCount}</SheetsCount>
    </SearchWrap>
  )
}

export default SearchBar
