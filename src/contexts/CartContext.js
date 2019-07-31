import React, { createContext, useState, useReducer } from 'react'
import uuidv1 from 'uuid/v1'

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
  const [productsInCart, setProductsInCart] = useState([
    {
      id: 1,
      title: "100% Combed Cotton Pilot Caps",
      thumbnail: "https://firebasestorage.googleapis.com/v0/b/jellytree-3cb33.appspot.com/o/products%2Fpilot%20cap%2Fmain_BW_re1.jpg?alt=media&token=0e8b48c6-b337-4d59-948f-d7f899c63420",
      color: "Blue",
      size: "S / 0-3 Months",
      price: "12.99",
      quantity: 1,
      totalPrice: "12.99",
    }
  ])
  const addProduct = (title, price) => {
    setProductsInCart([...productsInCart, {
      id: uuidv1(), title, price
    }])
  }
  const removeProduct = (id) => {
    setProductsInCart(productsInCart.filter(product => product.id !== id))
  }

  const [visibleCart, dispatchCart] = useReducer(cartReducer, true)

  return (
    <CartContext.Provider value={{
      productsInCart, addProduct, removeProduct,
      visibleCart, dispatchCart
    }}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContextProvider
