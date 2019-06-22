import React from 'react'
import styled from 'styled-components'
import { Image, Button } from 'semantic-ui-react'
import MainImage from '../assets/home_main.jpg'
import Title from '../components/Title'
// import { Parallax } from 'react-scroll-parallax'

const Container = styled.div`
`
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 800px;
  background-image: url(${MainImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`

const Home = () => {
  return (
    <Container>
      <MainContainer>
        <Title />
        <Button
          size="huge" color="green">Shop Now</Button>
      </MainContainer>
      <div style={{ height: '1000px' }}></div>
    </Container>
  )
}

export default Home
