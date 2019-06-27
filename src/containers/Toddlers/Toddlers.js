import React from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/toddler_main.jpg'
import DownArrowIcon from '../../components/DownArrowIcon'

const Container = styled.div`
`
const Jumbotron = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 700px;
  background-image: url(${MainImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`
const Title = styled.div`
  font-size: 5em;
  color: white;
  margin: 1em 0;
`

const Babies = () => {
  return (
    <Container>
      <Jumbotron>
        <Title>Don't miss the moment</Title>
        <DownArrowIcon />
      </Jumbotron>
      <div style={{ height: '1000px' }}></div>
    </Container>
  )
}

export default Babies
