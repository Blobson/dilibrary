import React from "react"
import styled from "styled-components"

const HeaderWrap = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fff;
`

const LogoWrap = styled.div`
  display: flex;
  margin: 0.5em 1em;
  align-self: center;
`

const Logo = styled.img`

`

const Title = styled.h1`
  font-size: 2em;
`

const Header = () => {
  return (
    <HeaderWrap>
      <LogoWrap>
        <Logo src="logo.jpg" />
        <Title>
          Библиотека<br/>
          Балалаечной<br/>
          Литературы<br/>
        </Title>
      </LogoWrap>
    </HeaderWrap>
  )
}

export default Header
