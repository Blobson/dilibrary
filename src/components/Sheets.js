import React from 'react'
import styled from 'styled-components'
import Sheet from './Sheet'

const SheetsList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Sheets = ({ sheets }) => (
  <SheetsList>
    {sheets.map(sheet =>
      <Sheet key={sheet.id} sheet={sheet} />
    )}
  </SheetsList>
)

export default Sheets
