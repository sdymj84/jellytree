import React, { useState } from 'react'
import styled from 'styled-components'
import MainImage from '../assets/main-photos/home_main.jpg'
import Title from '../components/Title'
import DownArrowIcon from '../components/DownArrowIcon'
import Products from './Products/Products'

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
  const [isScrollDownClicked, setIsScrollDownClicked] = useState(() =>
    sessionStorage.getItem('isBonnetsRemoved')
  )
  const handleScrollDown = () => {
    setIsScrollDownClicked(true)
    sessionStorage.setItem('isBonnetsRemoved', true)
  }

  return (
    <Container>
      {!isScrollDownClicked &&
        <Jumbotron>
          <Title />
          <DownArrowIcon handleScrollDown={handleScrollDown} />
        </Jumbotron>}
      <Products category="all" />
    </Container>
  )
}

export default Home
