import React from 'react';
import styled from 'styled-components'
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import Footer from './components/Footer'
import Routes from './containers/Routes'
import { Ref } from 'semantic-ui-react'

const Container = styled.div`
  margin: auto;
  /* padding: 1em; */
`

function App() {
  const contextRef = React.createRef()
  return (
    <Ref innerRef={contextRef}>
      <Container>
        {window.innerWidth < 600
          ? <MobileHeader />
          : <Header contextRef={contextRef} />}
        <Routes />
        <Footer />
      </Container>
    </Ref>
  );
}

export default App;
