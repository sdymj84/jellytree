import React, { useState } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/toddler_main.jpg'
import DownArrowIcon from '../../components/DownArrowIcon'
import Products from '../Products/Products'

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
  text-align: center;
`

const Hats = () => {
  const [isScrollDownClicked, setIsScrollDownClicked] = useState(() =>
    sessionStorage.getItem('isHatsRemoved')
  )
  const handleScrollDown = () => {
    setIsScrollDownClicked(true)
    sessionStorage.setItem('isHatsRemoved', true)
  }

  return (
    <Container>
      {!isScrollDownClicked &&
        <Jumbotron>
          <Title>Don't miss the moment</Title>
          <DownArrowIcon handleScrollDown={handleScrollDown} />
        </Jumbotron>}
      <Products category='Hats' />
    </Container>
  )
}

export default Hats
