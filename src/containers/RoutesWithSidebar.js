import React, { useContext } from 'react'
import { Sidebar, Segment, Icon } from 'semantic-ui-react'
import CartContainer from './Cart/CartContainer'
import { CartContext } from '../contexts/CartContext'
import Routes from './Routes'
import styled from 'styled-components'
import theme from '../theme'

const isMobile = window.innerWidth < 600

const CloseButton = styled.div`
  margin-right: 1em;
  height: 70px;
  text-align: right;
  .icon:hover {
    color: ${theme.color};
  }
`

const RoutesWithSidebar = () => {
  const { visibleCart, dispatchCart } = useContext(CartContext)
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Segment}
        animation='overlay'
        direction='right'
        onVisible={() => isMobile && window.scrollTo(0, 0)}
        onHide={() => dispatchCart({ type: 'CLOSE_CART' })}
        vertical
        secondary
        visible={visibleCart}
        width='very wide'
        style={isMobile ? { width: '100%' } : {
          position: 'fixed',
          zIndex: '1001'
        }}
      >
        <CloseButton>
          <Icon name="angle right" size="huge"
            onClick={() => dispatchCart({ type: 'CLOSE_CART' })} />
        </CloseButton>
        <CartContainer />
      </Sidebar>
      <Sidebar.Pusher
        style={{ zIndex: '0' }}>
        <Routes />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default RoutesWithSidebar
