import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`
const Nav = styled.div`
  display: flex;
  max-width: 800px;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
`
const Item = styled.div`
  font-size: 1.3em;
  padding: 0.5em 1em;
  font-weight: bold;
  color: #00915c;

  cursor: pointer;
  
  :hover {
    animation: jello 0.5s infinite;
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1)
    }
    50% {
      transform: scale(0.9, 1.1)
    }
  }
`

const Navbar = () => {
  return (
    <Container>
      <Nav>
        <Item>New</Item>
        <Item>Babies</Item>
        <Item>Infants</Item>
      </Nav>
    </Container>
  )
}

export default Navbar
