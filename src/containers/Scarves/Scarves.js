import React, { useState } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/girls_main.jpg'
import DownArrowIcon from '../../components/DownArrowIcon'
import Products from '../Products/Products'

const Container = styled.div`
  .vanish {
    animation: vanish-animation 0.2s ease;
  }

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

const Scarves = () => {
  const [isScrollDownClicked, setIsScrollDownClicked] = useState(() =>
    sessionStorage.getItem('isScarvesRemoved')
  )

  const [isVanishing, setIsVanishing] = useState(false)
  const handleScrollDown = () => {
    setIsVanishing(true)
    setTimeout(() => {
      setIsScrollDownClicked(true)
      sessionStorage.setItem('isScarvesRemoved', true)
    }, 200);

  }

  return (
    <Container>
      {!isScrollDownClicked &&
        <Jumbotron className={isVanishing ? "vanish" : ""}>
          <Title>Wear the Jelly</Title>
          <DownArrowIcon handleScrollDown={handleScrollDown} />
        </Jumbotron>}
      <Products category="Scarves" />
    </Container>
  )
}

export default Scarves
