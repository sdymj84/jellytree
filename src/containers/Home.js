import React, { Fragment } from 'react'
import MainImage from '../assets/main-photos/home_main.jpg'
import Title from '../components/Title'
import Products from './Products/Products'
import Jumbotron from '../components/Jumbotron'


const Home = () => {
  return (
    <Fragment>
      <Jumbotron
        image={MainImage}
        category="Home">
        <Title />
      </Jumbotron>
      <Products category='all' />
    </Fragment>
  )
}

export default Home
