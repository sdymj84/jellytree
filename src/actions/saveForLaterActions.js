// import useAxios from 'axios-hooks'
import urls from '../urls'
import axios from 'axios'
import _ from 'lodash'

export const listSaveForLaterProducts = (user) => {
  return async dispatch => {
    dispatch({ type: 'LIST_SFL_PRODUCTS_REQUEST' })

    try {
      const res = await axios.post(urls.listSaveForLaterProducts, {
        uid: user.uid || ""
      })
      return dispatch({
        type: 'LIST_SFL_PRODUCTS_SUCCESS',
        payload: {
          saveForLaterProducts: res.data
        }
      })
    } catch (e) {
      console.log(e)
      return dispatch({
        type: 'LIST_SFL_PRODUCTS_FAILURE',
        payload: {
          error: e.response.message
        }
      })
    }
  }
}



export const addSaveForLaterProduct = (product) => {
  return async dispatch => {
    dispatch({ type: 'ADD_SFL_PRODUCT_REQUEST' })

    try {
      const res = await axios.put(urls.addToSaveForLater, {
        cartProduct: product
      })

      return dispatch({
        type: 'ADD_SFL_PRODUCT_SUCCESS',
        payload: { newSaveForLaterProduct: res.data }
      })

    } catch (e) {
      return dispatch({
        type: 'ADD_SFL_PRODUCT_FAILURE',
        payload: { error: e.response.message }
      })
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