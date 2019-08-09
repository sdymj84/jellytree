import React, { Fragment } from 'react'
import Cart from './Cart'
import SaveForLater from './SaveForLater'


const CartContainer = () => {
  return (
    <Fragment>
      <Cart />
      <hr />
      <div
        style={{
          margin: '2em 0 1em 1em',
          fontSize: '1.5em',
        }}>Saved For Later</div>
      <SaveForLater />
    </Fragment>
  )
}

export default CartContainer
