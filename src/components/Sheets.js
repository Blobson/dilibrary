import React, { useContext } from 'react'
import styled from 'styled-components'

import Sheet from './Sheet'
import { CatalogContext } from '../data/CatalogProvider'

const SheetsWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Sheets = () => {
  const { filteredSheets } = useContext(CatalogContext)

  return (
    <SheetsWrap>
      {filteredSheets.map(sheet =>
        <Sheet key={sheet.id} sheet={sheet} />
      )}
    </SheetsWrap>
  )
}

export default Sheets
