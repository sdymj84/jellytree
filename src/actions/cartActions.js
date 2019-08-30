// import useAxios from 'axios-hooks'
import urls from '../urls'
import axios from 'axios'
import _ from 'lodash'

export const listCartProducts = (user) => {
  return async dispatch => {
    dispatch({ type: 'LIST_CART_PRODUCTS_REQUEST' })

    if (!user) {
      // User not signed - fetch from session storage
      return dispatch({
        type: 'LIST_CART_PRODUCTS_SUCCESS',
        payload: {
          cartProducts: JSON.parse(sessionStorage.getItem('cart')) || []
        }
      })
    } else {
      // User signed - fetch from database
      try {
        const res = await axios.post(urls.listCartProducts, {
          uid: user.uid || ""
        })
        return dispatch({
          type: 'LIST_CART_PRODUCTS_SUCCESS',
          payload: {
            cartProducts: res.data
          }
        })
      } catch (e) {
        console.log(e)
        return dispatch({
          type: 'LIST_CART_PRODUCTS_FAILURE',
          payload: {
            error: e.response.message
          }
        })
      }
    }
  }
}



export const addCartProduct = (user, newCartProduct) => {
  return async dispatch => {
    dispatch({ type: 'ADD_CART_PRODUCT_REQUEST' })

    if (!user) {
      // User not signed in - add to session storage
      const cartProducts = JSON.parse(sessionStorage.getItem('cart')) || []
      const newCartProducts = [...cartProducts, newCartProduct]
      sessionStorage.setItem('cart', JSON.stringify(newCartProducts))

      return dispatch({
        type: 'ADD_CART_PRODUCT_SUCCESS',
        payload: { newCartProduct }
      })

    } else {
      // User signed in - add to database
      try {
        await axios.post(urls.setCartProduct, {
          newCartProduct
        })
        return dispatch({
          type: 'ADD_CART_PRODUCT_SUCCESS',
          payload: { newCartProduct }
        })
      } catch (e) {
        return dispatch({
          type: 'ADD_CART_PRODUCT_FAILURE',
          payload: { error: e.response.message }
        })
      }
    }
  }
}


export const updateCartProductQty = (user, id, quantity, price) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_CART_PRODUCT_QTY_REQUEST',
      payload: { id }
    })

    if (!user) {
      // User not signed in - update on session storage
      const cartProducts = JSON.parse(sessionStorage.getItem('cart'))
      const newCartProducts = cartProducts.map(product =>
        product.id === id
          ? {
            ...product, quantity,
            totalPrice: Number(product.price) * Number(quantity)
          }
          : product
      )
      sessionStorage.setItem('cart', JSON.stringify(newCartProducts))

      dispatch({
        type: 'UPDATE_CART_PRODUCT_QTY_SUCCESS',
        payload: { id, quantity }
      })

    } else {
      // User signed in - update on database
      try {
        await axios.put(urls.updateCartProductQty, {
          id, price, quantity
        })
        dispatch({
          type: 'UPDATE_CART_PRODUCT_QTY_SUCCESS',
          payload: { id, quantity }
        })
      } catch (e) {
        dispatch({
          type: 'UPDATE_CART_PRODUCT_QTY_FAILURE',
          payload: { id }
        })
      }
    }
  }
}


export const deleteCartProduct = (user, id) => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_CART_PRODUCT_REQUEST',
      payload: { id }
    })

    if (!user) {
      // User not signed in - delete from session storage
      const cartProducts = JSON.parse(sessionStorage.getItem('cart'))
      const newCartProducts = _.filter(cartProducts,
        cartProduct => cartProduct.id !== id
      )
      sessionStorage.setItem('cart', JSON.stringify(newCartProducts))

      return dispatch({
        type: 'DELETE_CART_PRODUCT_SUCCESS',
        payload: { id }
      })

    } else {
      // User signed in - delete from database
      try {
        await axios.put(urls.deleteCartProduct, { id })
        return dispatch({
          type: 'DELETE_CART_PRODUCT_SUCCESS',
          payload: { id }
        })
      } catch (e) {
        return dispatch({
          type: 'DELETE_CART_PRODUCT_FAILURE',
          payload: { error: e.response.message }
        })
      }

    }
  }
}