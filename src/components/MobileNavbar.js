import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const PosedSidebar = posed.div({
  hidden: {
    x: '-100%',
    transition: {
      ease: 'linear'
    }
  },
  visible: {
    x: 0,
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
  color: navy;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    animation: jello-slow 0.5s infinite;
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
`

const Navbar = (props) => {
  return (
    <StyledSidebar pose={props.visible ? "visible" : "hidden"}>
      <ItemContainer>
        <Item>New Arrivals</Item>
        <Item>Babies</Item>
        <Item>Infants</Item>
        <Item>Boys & Girls</Item>
        <Item>All Collections</Item>
        <Item>Mobile Navbar</Item>
      </ItemContainer>
    </StyledSidebar>
  )
}


export default Navbar
