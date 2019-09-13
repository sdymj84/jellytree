import React, { Fragment } from 'react'
import styled from 'styled-components'
import MainImage from '../../assets/main-photos/baby_main.jpg'
import Products from '../Products/Products'
import Jumbotron from '../../components/Jumbotron'


const Title = styled.div`
  font-size: 5em;
  color: white;
  margin: 1em 0;
  text-align: center;
`

const Bonnets = () => {
  return (
    <Fragment>
      <Jumbotron
        image={MainImage}
        category="Bonnets">
        <Title>Special care for babies</Title>
      </Jumbotron>
      <Products category='Bonnets' />
    </Fragment>
  )
}

export default Bonnets
