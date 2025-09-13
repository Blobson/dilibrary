import React from 'react'
import styled from 'styled-components'

import { IoMdPricetag as TagIcon } from "react-icons/io"

const CategoryTag = styled.div`
  padding: 0 0 0 0.4em;
  background-color: #555;
  border-radius: 0.5em 0 0 0.5em;
  display: flex;
  align-items: center;
  font-size: 1.1em;
`

const CategoryName = styled.div`
  padding: 0.3em 0.5em 0.4em 0.2em;
  background-color: #555;
  display: flex;
  align-items: center;
`

const CategorySheetCount = styled.div`
  padding: 0 0.5em 0 0.3em;
  border-radius: 0 0.5em 0.5em 0;
  border: 1px solid #555;
  background-color: #ccc;
  color: #555;
  display: flex;
  align-items: center;
`

const CategoryPane = styled.div`
  margin: 0.4em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;

  cursor: pointer;
  font-size: 0.7em;
  font-weight: 700;
  color: #fff;
  background-color: #555;

  & > * {
    align-self: stretch;
  }

  &:hover {
    color: rgb(255, 197, 0);
    ${CategorySheetCount} {
      background-color: rgb(255, 218, 91);
    }
  }

  &.selected, &.selected:hover {
    background-color: rgb(255, 218, 91);

    & > * {
      color: #c04c4cff;
      background-color: rgb(255, 218, 91);
    }

    ${CategorySheetCount} {
      border-color: rgba(255, 203, 32, 1);
      background-color: rgba(255, 203, 32, 1);
    }
  }
`

const Category = ({ name, selected, toggleCategory, sheetCount }) => (
  <CategoryPane
    className={selected ? 'selected' : ''}
    onClick={_ => toggleCategory(name)}
  >
    <CategoryTag>
      <TagIcon />
    </CategoryTag>
    <CategoryName>
      {name}
    </CategoryName>
    <CategorySheetCount>
      {sheetCount}
    </CategorySheetCount>
  </CategoryPane>
)


export default Category
