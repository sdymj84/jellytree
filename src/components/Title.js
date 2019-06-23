import React from 'react'
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
    color: '#fff',
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
          '#fff', '#62C6BA', '#fff'],
        duration: 40000,
      }
    }
  },
}

const StyledTitle = styled.div`
  font-size: 10em;
  font-family: 'Asap', 'Exo', 'Concert One', 'Dosis', cursive;
  color: white;
  margin: 1em;
  @media (max-width: 600px) {
    font-size: 3.3em;
  }
`

const Title = () => {
  return (
    <StyledTitle>
      <SplitText
        initialPose="hidden"
        pose="visible"
        // pose={visible ? "visible" : "hidden"}
        charPoses={charPoses}>
        JELLYTREE
      </SplitText>
    </StyledTitle>
  )
}

export default Title