import React from 'react';
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import Footer from './components/Footer'
import Routes from './containers/Routes'
import { Container, Ref } from 'semantic-ui-react'

function App() {
  const contextRef = React.createRef()
  return (
    <Ref innerRef={contextRef}>
      <div>
        {window.innerWidth < 600
          ? <MobileHeader />
          : <Header contextRef={contextRef} />}
        <Routes />
        <Footer />
      </div>
    </Ref>
  );
}

export default App;
