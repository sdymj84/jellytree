import React, { useState } from 'react'
import styled from 'styled-components'
import { Sticky } from 'semantic-ui-react'
import posed from 'react-pose'
import theme from '../theme'
import { Link } from "react-router-dom";

const PosedContainer = posed.div({
  unfix: {
    // scale: 1,
    fontSize: '1em',
  },
  fix: {
    // scale: 1.05,
    fontSize: '1.05em',
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
  justify-content: space-evenly;
  align-items: center;
`
const Item = styled.div`
  font-size: 1.2em;
  padding: 0.4em 1em;
  color: ${theme.color};
  cursor: pointer;
  :hover {
    animation: jello-slow 0.5s infinite;
  }
`
const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`

const Navbar = (props) => {
  const [isFixed, setIsFixed] = useState(false)

  const handleOnStick = () => {
    setIsFixed(true)
  }
  const handleOnUnstick = () => {
    setIsFixed(false)
  }
  return (
    <Sticky
      context={props.contextRef}
      onStick={handleOnStick}
      onUnstick={handleOnUnstick}>
      <Container pose={isFixed ? "fix" : "unfix"}>
        <Nav>
          <Item>New Arrivals</Item>
          <StyledLink to="/babies">
            <Item>Babies</Item>
          </StyledLink>
          <StyledLink to="/toddlers">
            <Item>Toddlers</Item>
          </StyledLink>
          <StyledLink to="/boys-girls">
            <Item>Boys & Girls</Item>
          </StyledLink>
          <StyledLink to="/all-collections">
            <Item>All Collections</Item>
          </StyledLink>
        </Nav>
      </Container>
    </Sticky>
  )
}


export default Navbar
