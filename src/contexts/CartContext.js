import React, { createContext, useReducer, useEffect, useContext } from 'react'
import useAxios from 'axios-hooks'
import urls from '../urls';
import { AuthContext } from '../contexts/AuthContext'

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

const saveForLaterProductReducer = (saveForLaterProducts, action) => {
  switch (action.type) {
    case 'INITIAL_PRODUCTS_LOADING':
      return { loading: action.payload.loading }
    case 'INITIAL_PRODUCTS_ERROR':
      return { error: action.payload.error }
    case 'INITIAL_PRODUCTS_SUCCESS':
      return action.payload.saveForLaterProducts

    case 'ADD_PRODUCT_LOADING':
      return [...saveForLaterProducts, action.payload]
    case 'ADD_PRODUCT_ERROR':
      return saveForLaterProducts.filter(product => product.loading !== true)
        .concat(action.payload.newSaveForLaterProducts)
    case 'ADD_PRODUCT_SUCCESS':

      return saveForLaterProducts.filter(product => product.loading !== true)
        .concat(action.payload.newSaveForLaterProducts)

    case 'REMOVE_PRODUCT_SUCCESS':
      return saveForLaterProducts.filter(product => product.id !== action.payload.id)
    default:
      break;
  }
}

const CartContextProvider = (props) => {
  const { user } = useContext(AuthContext)
  const uid = user ? user.uid : ""

  const [cart, cartRefetch] = useAxios({
    url: urls.listCartProducts,
    method: 'POST',
    data: { uid },
  })
  const [saveForLater, saveForLaterRefetch] = useAxios(
    urls.listSaveForLaterProducts
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
          let cartData = []
          if (!user) {
            cartData = JSON.parse(sessionStorage.getItem('cart')) || []
          } else {
            cartData = data.length ? data : []
          }
          dispatchCartProducts({
            type: 'INITIAL_PRODUCTS_SUCCESS',
            payload: { cartProducts: cartData }
          })
        }
      }
    }
    setCartProducts(cart.data, cart.loading, cart.error)
    // eslint-disable-next-line
  }, [cart])

  const [saveForLaterProducts, dispatchSaveForLaterProducts] = useReducer(saveForLaterProductReducer, { loading: true })
  useEffect(() => {
    const setSaveForLaterProducts = (data, loading, error) => {
      if (loading) {
        return dispatchSaveForLaterProducts({
          type: 'INITIAL_PRODUCTS_LOADING',
          payload: { loading }
        })
      } else {
        if (error) {
          dispatchSaveForLaterProducts({
            type: 'INITIAL_PRODUCTS_ERROR',
            payload: { error }
          })
        } else {
          dispatchSaveForLaterProducts({
            type: 'INITIAL_PRODUCTS_SUCCESS',
            payload: { saveForLaterProducts: data }
          })
        }
      }
    }
    setSaveForLaterProducts(saveForLater.data, saveForLater.loading, saveForLater.error)
  }, [saveForLater])

  const [visibleCart, dispatchCart] = useReducer(cartReducer, false)

  return (
    <CartContext.Provider value={{
      cartProducts, dispatchCartProducts, cartRefetch,
      saveForLaterProducts, dispatchSaveForLaterProducts, saveForLaterRefetch,
      visibleCart, dispatchCart
    }}>
      {props.children}
    </CartContext.Provider >
  )
}

export default CartContextProvider
