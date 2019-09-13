import React, { Fragment } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/toddler_main.jpg'
import Products from '../Products/Products'
import Jumbotron from '../../components/Jumbotron'


const Title = styled.div`
  font-size: 5em;
  color: white;
  margin: 1em 0;
  text-align: center;
`

const Hats = () => {
  return (
    <Fragment>
      <Jumbotron
        image={MainImage}
        category="Hats">
        <Title>Don't miss the moment</Title>
      </Jumbotron>
      <Products category='Hats' />
    </Fragment>
  )
}

export default Hats
