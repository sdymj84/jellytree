import React from 'react';
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'

const Container = styled.div`
  margin: auto;
  padding: 1em;
`

function App() {
  return (
    <Container>
      <Header />

      <div style={{ height: '300px' }}>Body</div>

      <Footer />
    </Container>
  );
}

export default App;
