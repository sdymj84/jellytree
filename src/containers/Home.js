import React from 'react'
import styled from 'styled-components'
import MainImage from '../assets/main-photos/home_main.jpg'
import Title from '../components/Title'
import DownArrowIcon from '../components/DownArrowIcon'

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

const Home = () => {
  return (
    <Container>
      <Jumbotron>
        <Title />
        <DownArrowIcon />
      </Jumbotron>
      <div style={{ height: '1000px' }}></div>
    </Container>
  )
}

export default Home
