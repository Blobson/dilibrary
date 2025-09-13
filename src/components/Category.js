import React from 'react'
import styled from 'styled-components'

import { IoMdPricetag as TagIcon } from "react-icons/io"

const CategoryPane = styled.div`
  margin: 0.4em;
  padding: 0.2em 0.5em;
  border-radius: 0.5em;
  display: flex;
  vertical-align: middle;

  cursor: pointer;
  font-size: 0.7em;
  font-weight: 700;
  background-color: #555;
  color: #fff;

  &:hover {
    color: rgba(255, 197, 0, 1);
  }

  &.selected, &.selected:hover {
    color: #c04c4cff;
    background-color: rgba(255, 218, 91, 0.83);
  }

  & > svg {
    margin-right: 0.2em;
    vertical-align: middle;
    font-size: 1.2em;
  }
`


const Category = ({ name, selected, toggleCategory }) => (
  <CategoryPane
    className={selected ? 'selected' : ''}
    onClick={_ => toggleCategory(name)}
  >
    <TagIcon />
    {name}
  </CategoryPane>
)


export default Category
