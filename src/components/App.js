import React from 'react'
import styled from 'styled-components'

import SheetsList from './Sheets'
import SearchBar from './SearchBar'
import Header from './Header'

const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 150vh;
  min-width: 30%;
  max-width: 1024px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
`

const Content = styled.div`
  margin: 1em;
  display: flex;
  flex-flow: column;
  justify-content: stretch;
`

const App = () => {
  return (
    <Wrap>
      <Content>
        <Header />
        <SearchBar />
        <SheetsList />
      </Content>
    </Wrap>
  )
}

export default App
