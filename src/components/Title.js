import React, { Fragment } from 'react'
import styled from 'styled-components'
import SplitText from 'react-pose-text'

const charPoses = {
  hidden: {
    opacity: 0,
    margin: 0,
    color: '#fff',
  },
  visible: {
    opacity: 1,
    margin: window.innerWidth < 600 ? 0 : 10,
    color: '#62C6BA',
    delay: ({ charIndex }) => charIndex * 80,
    transition: {
      ease: 'linear',
      margin: {
        type: 'spring',
      },
      color: {
        delay: 1000,
        type: 'keyframes',
        values: ['#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#fff', '#fff',
          '#fff', '#62C6BA', '#62C6BA'],
        duration: 40000,
      }
    }
  },
}

const StyledTitle = styled.div`
  font-size: 8em;
  font-family: 'Asap', 'Exo', 'Concert One', 'Dosis', cursive;
  color: white;
  margin: 0.1em;
  @media (max-width: 1120px) {
    font-size: 7em;
  }
  @media (max-width: 850px) {
    font-size: 4em;
  }
  @media (max-width: 600px) {
    font-size: 3.3em;
  }
  
`
const Slogan = styled.div`
  font-size: 3em;
  color: white;
  margin-bottom: 2em;
`
const P = styled.h2`
  color: white;
  position: relative;
  top: -3em;
  padding: 1em;
  text-align: center;
`

const Title = () => {
  return (
    <Fragment>
      <StyledTitle>
        <SplitText
          initialPose="hidden"
          pose="visible"
          charPoses={charPoses}>
          JELLYTREE
        </SplitText>
      </StyledTitle>
      <Slogan>Put On The Love</Slogan>
      <P>JELLYTREE DESIGNS & CRAFT WITH CARE</P>
    </Fragment>
  )
}

export default Title