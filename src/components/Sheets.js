import React, { useContext } from 'react'
import styled from 'styled-components'

import Sheet from './Sheet'
import { StateContext } from '../data/StateProvider'
import useSheetSearchParams from '../data/SheetSearchParams'

const SheetsWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Sheets = () => {
  const { searchSheets } = useContext(StateContext)
  const { filter, selectedCategories } = useSheetSearchParams()
  const filteredSheets = searchSheets(filter, selectedCategories)

  return (
    <SheetsWrap>
      {filteredSheets.map(sheet =>
        <Sheet key={sheet.id} sheet={sheet} />
      )}
    </SheetsWrap>
  )
}

export default Sheets
