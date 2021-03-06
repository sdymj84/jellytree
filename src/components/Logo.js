import React from 'react'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'
import JellyTree from '../assets/jellytree_logo.jpg'
import { Link } from "react-router-dom";

const StyledImage = styled(Image)`
  @media (max-width: 600px) {
    &&& {
      display: inline-block;
    }
  }
  ${props => {
    if (props.position === 'center') {
      return 'margin: auto;'
    } else if (props.position === 'left') {
      return 'margin-right: auto;'
    } else if (props.position === 'right') {
      return 'margin-left: auto;'
    }
  }}

  :hover {
    animation: jello-active 0.5s infinite;
    @media (max-width: 600px) {
      animation: jello-active 0.5s;
    }
  }
`

const Logo = (props) => {
  return (
    <Link to="/">
      <StyledImage
        src={JellyTree}
        size="small"
        style={{
          width: '100px',
          height: '30px',
        }}
        position={props.position} />
    </Link>
  )
}

export default Logo
