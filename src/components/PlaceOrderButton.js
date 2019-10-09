import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import urls from '../urls'
import axios from 'axios'



const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 0 15px -4px grey;
    margin: 1em 0;
    max-width: 500px;
  }
`

const PlaceOrderButton = (props) => {
  const amount = props.orderTotal
    ? (parseFloat(props.orderTotal) * 100).toString() : null

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(urls.billing, {
        amount: amount,
        source: {
          object: "card",
          number: '4242424242424242',
          exp_month: 2,
          exp_year: 2024,
          name: "Minjun Youn",
        }
      })
      console.log(res)
      console.log('Order placed')
    } catch (e) {
      console.log(e)
      console.log("Error on payment", e.response.message)
    }
  }

  return (
    <StyledButton fluid
      disabled={!amount}
      size="big" color="orange"
      onClick={handlePlaceOrder}>
      Place Your Order
    </StyledButton>
  )
}

export default PlaceOrderButton
