import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SplitText from 'react-pose-text'

const charPoses = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    delay: ({ charIndex }) => charIndex * 50,
  },
}

const StyledTitle = styled.div`
  font-size: 5em;
  font-weight: bold;
  color: white;
  margin: 1em;
  @media (max-width: 600px) {
    font-size: 3em;
  }
`

const Title = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible)
    }, 1000);
  }, [])

  console.log(visible)
  return (
    <StyledTitle>
      <SplitText
        pose={visible ? "visible" : "hidden"}
        charPoses={charPoses}>
        JELLYTREE
      </SplitText>
    </StyledTitle>
  )
}

export default Title
