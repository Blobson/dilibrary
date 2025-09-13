import React, { useContext } from 'react'
import styled from 'styled-components'

import Category from './Category'
import { StateContext } from '../data/StateProvider'

const CategoryListWrap = styled.div`
  width: 100%;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const CategoryListPrompt = styled.div`
  margin: 0.3em;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #555;
`

const CategoryList = ({ selectedCategories, toggleCategory }) => {
  const { categories } = useContext(StateContext)

  return (
    <CategoryListWrap>
      <CategoryListPrompt>
        Выберите одну или несколько категорий:
      </CategoryListPrompt>
      {categories.map(category =>
        <Category
          key={category.name}
          name={category.name}
          selected={selectedCategories.includes(category.name)}
          toggleCategory={toggleCategory}
        />
      )}
    </CategoryListWrap>
  )
}

export default CategoryList
