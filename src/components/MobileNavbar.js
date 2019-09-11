import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import theme from '../theme'
import { Link } from "react-router-dom";

const PosedSidebar = posed.div({
  hidden: {
    x: '-100%',
    transition: {
      ease: 'easeOut'
    }
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 19,
    }
  },
})

const ItemContainer = styled.div`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  justify-content: center;
  align-items: center;
`
const Item = styled.div`
  font-size: 1.4em;
  padding: 0.4em 1em;
  color: ${theme.color};
  margin-bottom: 10px;
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
const StyledSidebar = styled(PosedSidebar)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: white;
  opacity: 0.9;
`

const MobileNavbar = (props) => {
  return (
    <StyledSidebar pose={props.visible ? "visible" : "hidden"}
      onClick={props.handleHide}>
      <ItemContainer>
        <StyledLink to="/" onClick={props.handleHide}>
          <Item>Home</Item>
        </StyledLink>

        <StyledLink to="new-arrivals">
          <Item>New Arrivals</Item>
        </StyledLink>

        <StyledLink to="/bonnets">
          <Item>Bonnets</Item>
        </StyledLink>

        <StyledLink to="/hats">
          <Item>Hats</Item>
        </StyledLink>

        <StyledLink to="/scarves">
          <Item>Scarves</Item>
        </StyledLink>

        <StyledLink to="/all-collections" onClick={props.handleHide}>
          <Item>All Collections</Item>
        </StyledLink>
      </ItemContainer>
    </StyledSidebar>
  )
}


export default MobileNavbar
