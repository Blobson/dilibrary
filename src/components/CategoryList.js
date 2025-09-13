import React from 'react'
import styled from 'styled-components'

import Category from './Category'

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

const CategoryList = ({ categories, selectedCategories, categoryCounters, toggleCategory }) => {
  return (
    <CategoryListWrap>
      <CategoryListPrompt>
        Выберите одну или несколько категорий:
      </CategoryListPrompt>
      {categories.filter(c => categoryCounters[c] > 0).map(category =>
        <Category
          key={category}
          name={category}
          sheetCount={categoryCounters[category]}
          selected={selectedCategories.includes(category)}
          toggleCategory={toggleCategory}
        />
      )}
    </CategoryListWrap>
  )
}

export default CategoryList
