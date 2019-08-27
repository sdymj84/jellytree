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

const Container = styled.div`
  margin: 3em auto;
  width: 70%;
  min-width: 900px;
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
  }, [contextRef])

  const { user } = useContext(AuthContext)
  if (!user) {
    props.history.push(`/signin?redirectUrl=${window.location.pathname}`)
    return null
  }


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

export default withRouter(Checkout)
