import React, { useState } from 'react'
import styled from 'styled-components'
import DownArrowIcon from './DownArrowIcon'


const StyledJumbotron = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 700px;
  background-image: url(${p => p.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`


const Jumbotron = (props) => {
  const [isScrollDownClicked, setIsScrollDownClicked] = useState(() =>
    sessionStorage.getItem(`is${props.category}Removed`)
  )
  const [isVanishing, setIsVanishing] = useState(false)
  const handleScrollDown = () => {
    setIsVanishing(true)
    setTimeout(() => {
      setIsScrollDownClicked(true)
      sessionStorage.setItem(`is${props.category}Removed`, true)
    }, 200);
  }

  if (isScrollDownClicked) {
    return null
  }

  return (
    <StyledJumbotron
      className={isVanishing ? "vanish" : ""}
      image={props.image}>
      {props.children}
      <DownArrowIcon handleScrollDown={handleScrollDown} />
    </StyledJumbotron>
  )
}

export default Jumbotron
