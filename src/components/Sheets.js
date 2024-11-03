import React, { useContext } from 'react'
import styled from 'styled-components'

import Sheet from './Sheet'
import { CatalogContext } from '../data/CatalogProvider'

const SheetsList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Sheets = () => {
  const { filteredSheets } = useContext(CatalogContext)

  return (
    <SheetsList>
      {filteredSheets.map(sheet =>
        <Sheet key={sheet.id} sheet={sheet} />
      )}
    </SheetsList>
  )
}

export default Sheets
