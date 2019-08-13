import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import theme from '../../theme'
import {
  Ref, Rail, Sticky, Grid,
} from "semantic-ui-react";
import CheckoutCart from '../Cart/CheckoutCart';
import CheckoutSteps from './CheckoutSteps'

const Container = styled.div`
  margin: 3em 10em;
  min-height: 700px;
  .ui.right.dividing.rail {
    padding-left: 1rem;
    margin-left: 1rem;
  }
  .ui.dividing.rail{
    width: 58%;
  }
`
const Head = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  padding: 0 4em;
  margin: auto;
  color: ${theme.color};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  
  .checkout {
    font-size: 2em;
  }
  .continue-shopping {
    cursor: pointer;
  }
`

const Checkout = () => {
  const [contextRef, setContextRef] = useState(React.createRef())
  useEffect(() => {
    if (!contextRef.current) {
      setContextRef(React.createRef())
    }
  }, [contextRef])

  return (
    <Fragment>
      <Head>
        <div className="checkout">CHECKOUT</div>
        <div className="continue-shopping">Continue Shopping</div>
      </Head>

      <Container>
        <Grid columns={1}>
          <Ref innerRef={contextRef}>
            <Grid.Column width={10}>
              <CheckoutSteps />
              <Rail dividing position='right'>
                <Sticky context={contextRef} offset={30}>
                  <CheckoutCart />
                </Sticky>
              </Rail>
            </Grid.Column>
          </Ref>
        </Grid>
      </Container>
    </Fragment >
  )
}

export default Checkout
