import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'


const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 0 15px -4px grey;
    margin: 1em 0;
    max-width: 500px;
  }
`

const PlaceOrderButton = () => {
  const handlePlaceOrder = () => {
    console.log('Order placed')
  }

  return (
    <StyledButton fluid
      size="big" color="orange"
      onClick={handlePlaceOrder}>
      Place Your Order
    </StyledButton>
  )
}

export default PlaceOrderButton
