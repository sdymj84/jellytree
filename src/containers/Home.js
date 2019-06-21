import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1000px;
`

const Home = () => {
  return (
    <Container>
      This is HOME page
    </Container>
  )
}

export default Home
