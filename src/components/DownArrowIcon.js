import React from 'react'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const DownDown = styled(Icon)`
  animation-name: downdown;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;

  :hover {
    cursor: pointer;
    animation-name: floating;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes downdown {
    0% {
      opacity: 0;
      transform: translate(0px, 0px)
    }
    50% {
      opacity: 1;
      transform: translate(0px, 20px)
    }
    100% {
      opacity: 0;
      transform: translate(0px, 20px)
    }
  }
  
  @keyframes floating {
    0% {
      transform: translate(0px, 20px)
    }
    50% {
      transform: translate(0px, 10px)
    }
    100% {
      transform: translate(0px, 20px)
    }
  }
`

const DownArrowIcon = () => {
  return (
    <DownDown
      name="angle double down"
      size="huge" inverted />
  )
}

export default DownArrowIcon
