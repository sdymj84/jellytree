import React, { useState } from 'react'
import styled from 'styled-components'
import { Sticky } from 'semantic-ui-react'
import posed from 'react-pose'

const PosedContainer = posed.div({
  unfix: {
    scale: 1,
  },
  fix: {
    scale: 1.05,
  },
})
const Container = styled(PosedContainer)`
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`
const Nav = styled.div`
  display: flex;
  max-width: 800px;
  margin: auto;
  margin-bottom: 1em;
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

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false)

  const handleOnStick = () => {
    setIsFixed(true)
  }
  const handleOnUnstick = () => {
    setIsFixed(false)
  }

  return (
    <Sticky
      onStick={handleOnStick}
      onUnstick={handleOnUnstick}>
      <Container pose={isFixed ? "fix" : "unfix"}>
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
