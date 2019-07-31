import React, { useContext } from 'react'
import { Sidebar, Segment, Icon } from 'semantic-ui-react'
import Cart from './Cart/Cart'
import { CartContext } from '../contexts/CartContext'
import Routes from './Routes'
import styled from 'styled-components'
import theme from '../theme'

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
        onHide={() => dispatchCart({ type: 'CLOSE_CART' })}
        vertical
        secondary
        visible={visibleCart}
        width='very wide'
      >
        <CloseButton>
          <Icon name="angle right" size="huge"
            onClick={() => dispatchCart({ type: 'CLOSE_CART' })} />
        </CloseButton>
        <Cart />
      </Sidebar>
      <Sidebar.Pusher>
        <Routes />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default RoutesWithSidebar
