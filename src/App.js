import React from 'react';
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './containers/Routes'
import { ParallaxProvider } from 'react-scroll-parallax'

const Container = styled.div`
  margin: auto;
  /* padding: 1em; */
`

function App() {
  return (
    <Container>
      <Header />
      <ParallaxProvider>
        <Routes />
      </ParallaxProvider>
      <Footer />
    </Container>
  );
}

export default App;
