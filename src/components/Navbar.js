import React from 'react'
import styled from 'styled-components'
import { Sticky } from 'semantic-ui-react'
import posed from 'react-pose'

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
  font-size: 1.2em;
  padding: 0.4em 1em;
  color: navy;

  cursor: pointer;
  
  :hover {
    animation: jello-slow 0.5s infinite;
  }
`
// TODO: Add pose animation when navbar is fixed

const Navbar = () => {
  const handleOnStick = () => {
    console.log('sticked')
  }

  return (
    <Sticky
      onStick={handleOnStick}>
      <Container>
        <Nav>
          <Item>New</Item>
          <Item>Babies</Item>
          <Item>Infants</Item>
        </Nav>
      </Container>
    </Sticky>
  )
}


export default Navbar
