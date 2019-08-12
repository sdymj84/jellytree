import React from 'react';
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import Footer from './components/Footer'
import RoutesWithSidebar from './containers/RoutesWithSidebar'
import { Ref } from 'semantic-ui-react'
import CartContextProvider from './contexts/CartContext';
import DbContextProvider from './contexts/DbContext';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  const contextRef = React.createRef()
  return (
    <Ref innerRef={contextRef}>
      <div>
        <DbContextProvider>
          <AuthContextProvider>
            <CartContextProvider>
              {window.innerWidth < 600
                ? <MobileHeader />
                : <Header
                  contextRef={contextRef} />}
              <RoutesWithSidebar />
              <Footer />
            </CartContextProvider>
          </AuthContextProvider>
        </DbContextProvider>
      </div>
    </Ref>
  );
}

export default App;
