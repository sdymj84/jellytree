import React, { Fragment } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/girls_main.jpg'
import Products from '../Products/Products'
import Jumbotron from '../../components/Jumbotron'


const Title = styled.div`
  font-size: 5em;
  color: white;
  margin: 1em 0;
  text-align: center;
`

const Scarves = () => {
  return (
    <Fragment>
      <Jumbotron
        image={MainImage}
        category="Scarves">
        <Title>Wear the Jelly</Title>
      </Jumbotron>
      <Products category='Scarves' />
    </Fragment>
  )
}

export default Scarves
