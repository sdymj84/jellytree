import React, { createContext, useReducer, useEffect } from 'react'
import useAxios from 'axios-hooks'
import urls from '../urls';

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
          }
        } else {
          return cartProduct
        }
      })
    case 'UPDATE_QTY':
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

    case 'INITIAL_PRODUCTS_LOADING':
      return { loading: action.payload.loading }
    case 'INITIAL_PRODUCTS_ERROR':
      return { error: action.payload.error }
    case 'INITIAL_PRODUCTS_SUCCESS':
      return action.payload.cartProducts

    case 'ADD_PRODUCT_LOADING':
      return [...cartProducts, action.payload]
    case 'ADD_PRODUCT_ERROR':
      return cartProducts.filter(product => product.loading !== true)
        .concat(action.payload.newCartProduct)
    case 'ADD_PRODUCT_SUCCESS':
      return cartProducts.filter(product => product.loading !== true)
        .concat(action.payload.newCartProduct)

    case 'REMOVE_PRODUCT_SUCCESS':
      return cartProducts.filter(cartProduct => cartProduct.id !== action.payload.id)
    default:
      break;
  }
}

const CartContextProvider = (props) => {
  const [{ data, loading, error }, refetch] = useAxios(
    urls.listCartProducts
  )
  const [cartProducts, dispatchCartProducts] = useReducer(cartProductReducer, { loading: true })
  useEffect(() => {
    const setCartProducts = (data, loading, error) => {
      if (loading) {
        return dispatchCartProducts({
          type: 'INITIAL_PRODUCTS_LOADING',
          payload: { loading }
        })
      } else {
        if (error) {
          dispatchCartProducts({
            type: 'INITIAL_PRODUCTS_ERROR',
            payload: { error }
          })
        } else {
          dispatchCartProducts({
            type: 'INITIAL_PRODUCTS_SUCCESS',
            payload: { cartProducts: data }
          })
        }
      }
    }
    setCartProducts(data, loading, error)
  }, [data, loading, error])
  const [visibleCart, dispatchCart] = useReducer(cartReducer, false)


  return (
    <CartContext.Provider value={{
      cartProducts, dispatchCartProducts,
      refetch,
      visibleCart, dispatchCart
    }}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContextProvider
