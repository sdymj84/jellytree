import React, { useContext } from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { CartContext } from '../contexts/CartContext'

const Container = styled.div`
  margin-left: 0.4em;
  padding: 10px;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: shadow-hidden 0.5s;

  :hover {
    animation: shadow-show 0.3s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;

    div:first-child {
      animation: jello-active 0.5s;
    }
  }
`

const Bag = (props) => {
  const { dispatchCart } = useContext(CartContext)
  return (
    <Container onClick={() => dispatchCart({ type: 'OPEN_CART' })}>
      <div>
        <Icon name="shopping bag" size="big"
          style={{ margin: 'auto' }} />
      </div>
      {/* TODO: Should show number of products in cart */}
      <div>Bag (0)</div>
    </Container>
  )
}

export default Bag
