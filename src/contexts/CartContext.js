import React, {
  createContext, useReducer
} from 'react'

export const CartContext = createContext()

const cartReducer = (visibleCart, action) => {
  switch (action.type) {
    case 'OPEN_CART':
      return true
    case 'CLOSE_CART':
      return false
    default:
      break;
  }
}


const CartContextProvider = (props) => {

  const [visibleCart, dispatchCart] = useReducer(cartReducer, false)

  return (
    <CartContext.Provider value={{ visibleCart, dispatchCart }}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContextProvider



