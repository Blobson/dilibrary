import React from 'react'
import styled from 'styled-components'

import { IoMdPricetag as TagIcon } from "react-icons/io"

const SheetName = styled.div`
  margin: 0.2em 0;
  font-weight: 700;
`

const SheetAuthors = styled.div`
  margin: 0.2em 0;
  color: #555;
`

const SheetMod = styled.div`
  margin: 0.2em 0;
  font-size: 0.8em;
  color: #555;
  flex-grow: 1;
`

const SheetCategories = styled.div`
  margin: 0.2em 0;
  display: flex;
  flex-flow: row wrap-reverse;
  justify-content: flex-end;
`

const SheetCategory = styled.div`
  margin: 0.3em 0.3em 0.3em 0;
  padding: 0.1em 0.3em;
  font-size: 0.6em;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.07);
  color: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  vertical-align: middle;

  & > svg {
    margin-right: 0.1em;
  }
`

const SheetPane = styled.div`
  margin: 1em;
  padding: 1em;
  min-height: 3em;
  max-height: 15em;
  width: 15em;
  display: flex;
  flex-flow: column;

  flex-basic: 25%;
  flex-grow: 1;
  align-self: stretch;
  box-shadow: 2px 3px 10px rgba(0,0,0,0.5);
  border-radius: 1em;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 218, 91, 0.83);
    box-shadow: none;

    ${SheetName} {
      color: #d05353;
    }
  }
`

const donwloadSheet = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
}

const Sheet = ({ sheet }) => {
  return (
    <SheetPane onClick={_ => donwloadSheet(sheet.url)}>
      <SheetAuthors>
        {sheet.authors.join(", ")}
      </SheetAuthors>
      <SheetName>{sheet.title}</SheetName>
      <SheetMod>{sheet.mod}</SheetMod>
      <SheetCategories>
        {sheet.categories.map((category, index) =>
          <SheetCategory key={`${sheet.id}-cat-${index}`}>
            <TagIcon />
            {category}
          </SheetCategory>
        )}
      </SheetCategories>
    </SheetPane>
  )
}

export default Sheet
