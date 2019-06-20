import React from 'react'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'
import JellyTree from '../assets/antman.png'


const StyledImage = styled(Image)`
  display: block;
  margin: auto;

  :hover {
    animation: jello 0.5s infinite;
  }
  
  @keyframes jello {
    0% {
      transform: scale (1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
`

const Logo = () => {

  const handleLogoClick = () => {
    console.log("Go home")
  }

  return (
    <StyledImage
      src={JellyTree}
      size="small"
      style={{
        width: '100px',
        height: '100px',
      }}
      onClick={handleLogoClick} />
  )
}

export default Logo
