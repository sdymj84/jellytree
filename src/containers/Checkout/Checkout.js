import React, {
  Fragment, useState, useEffect, useContext
} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import theme from '../../theme'
import {
  Ref, Rail, Sticky, Grid,
} from "semantic-ui-react";
import CheckoutCart from '../Cart/CheckoutCart';
import CheckoutSteps from './CheckoutSteps'
import { AuthContext } from '../../contexts/AuthContext';
import { withRouter } from "react-router-dom";
import PlaceOrderButton from '../../components/PlaceOrderButton';


const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: ${isMobile ? '1em' : '3em auto'};
  width: ${isMobile ? '' : '70%'};
  min-width: ${isMobile ? '' : '900px'};
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
  padding: 0 1em;
  margin: auto;
  color: ${theme.color};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  
  .checkout {
    font-size: 2em;
  }
  .continue-shopping {
    color: ${theme.color};
    cursor: pointer;
    text-decoration: underline;
    :hover {
      color: ${theme.contrastColor};
    }
  }
`

const Checkout = (props) => {
  const [contextRef, setContextRef] = useState(() => React.createRef())
  useEffect(() => {
    if (!contextRef.current) {
      setContextRef(React.createRef())
    }
    // eslint-disable-next-line
  }, [])
  const [orderTotal, setOrderTotal] = useState(0)

  const { user } = useContext(AuthContext)
  if (!user) {
    props.history.push(`/signin?redirectUrl=${window.location.pathname}`)
    return null
  }



  const mRender = (
    <Container>
      <PlaceOrderButton orderTotal={orderTotal} />
      <CheckoutSteps orderTotal={orderTotal} />
      <CheckoutCart setOrderTotal={setOrderTotal} />
    </Container >
  )

  const render = (
    <Container>
      <Grid columns={1}>
        <Ref innerRef={contextRef}>
          <Grid.Column width={10}>
            <CheckoutSteps orderTotal={orderTotal} />
            <Rail dividing position='right'>
              <Sticky context={contextRef} offset={30}>
                <CheckoutCart setOrderTotal={setOrderTotal} />
              </Sticky>
            </Rail>
          </Grid.Column>
        </Ref>
      </Grid>
    </Container>
  )



  return (
    <Fragment>
      <Head>
        <div className="checkout">CHECKOUT</div>
        <Link to="/">
          <div className="continue-shopping">
            Continue Shopping
          </div>
        </Link>
      </Head>

      {isMobile ? mRender : render}
    </Fragment >
  )
}

export default withRouter(Checkout)
