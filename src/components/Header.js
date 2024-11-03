import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const HeaderWrap = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fff;
`

const LogoWrap = styled.div`
  display: flex;
  margin: 0.5em 1em;
  align-self: center;
  cursor: pointer;
`

const Logo = styled.img`
`

const Title = styled.h1`
  font-size: 2em;
`

const Header = () => {
  const navigate = useNavigate()

  return (
    <HeaderWrap>
      <LogoWrap onClick={e => navigate("/")}>
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
