import React from 'react';
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import Footer from './components/Footer'
import Routes from './containers/Routes'
import { Ref } from 'semantic-ui-react'
import ProductContextProvider from './contexts/ProductContext';

function App() {
  const contextRef = React.createRef()
  return (

    <Ref innerRef={contextRef}>
      <div>
        <ProductContextProvider>
          {window.innerWidth < 600
            ? <MobileHeader />
            : <Header contextRef={contextRef} />}
          <Routes />
          <Footer />
        </ProductContextProvider>
      </div>
    </Ref>

  );
}

export default App;
