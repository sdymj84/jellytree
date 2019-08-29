// import useAxios from 'axios-hooks'
import urls from '../urls'
import axios from 'axios'

export const addCartProduct = (newCartProduct) => {
  return dispatch => {

    // some API calls

    return dispatch({
      type: 'ADD_CART_PRODUCT',
      payload: {
        newCartProduct
      }
    })
  }
}

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