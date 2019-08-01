import React, { createContext, useReducer, useEffect } from 'react'
import uuidv1 from 'uuid/v1'
import useAxios from 'axios-hooks'

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

const cartProductReducer = (cartProducts, action) => {
  switch (action.type) {
    case 'CHANGE_QTY':
      return cartProducts.map(cartProduct => {
        if (cartProduct.id === action.payload.id) {
          return {
            ...cartProduct,
            quantity: action.payload.quantity,
            totalPrice: Number(cartProduct.price) * Number(action.payload.quantity)
          }
        } else {
          return cartProduct
        }
      })
    case 'INITIAL_PRODUCTS':
      return action.payload.cartProducts
    case 'ADD_PRODUCT':
      return [...cartProducts, action.payload.newProduct]
    case 'REMOVE_PRODUCT':
      return cartProducts.filter(cartProduct => cartProduct.id !== action.payload.id)
    default:
      break;
  }
}

const CartContextProvider = (props) => {
  const [{ data, loading, error }, refetch] = useAxios(
    'https://us-central1-jellytree-3cb33.cloudfunctions.net/listCartProducts'
  )
  const [cartProducts, dispatchCartProducts] = useReducer(cartProductReducer, [])
  useEffect(() => {
    const setCartProducts = (data, loading, error) => {
      if (loading) {
        console.log('loading')
        return []
      } else {
        if (error) {
          console.log('error')
          return []
        } else if (data) {
          console.log('data')
          return dispatchCartProducts({
            type: 'INITIAL_PRODUCTS',
            payload: { cartProducts: data }
          })
        }
      }
    }
    setCartProducts(data, loading, error)
  }, [data, loading, error])
  const [visibleCart, dispatchCart] = useReducer(cartReducer, true)

  console.log(data, loading, error)
  console.log(cartProducts)

  return (
    <CartContext.Provider value={{
      cartProducts, dispatchCartProducts,
      visibleCart, dispatchCart
    }}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContextProvider
