import React from 'react'
import { Routes, Route } from "react-router-dom"
import styled from 'styled-components'

import Header from './Header'
import Home from './Home'
import SearchBar from './SearchBar'
import Sheets from './Sheets'

const Wrap = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 150vh;
  min-width: 30%;
  max-width: 1024px;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  background: #fff;
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheets" element={<Sheets />} />
        </Routes>
      </Content>
    </Wrap>
  )
}

export default App
