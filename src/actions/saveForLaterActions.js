import urls from '../urls'
import axios from 'axios'

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
    dispatch({
      type: 'ADD_SFL_PRODUCT_REQUEST',
      payload: { id: product.id }
    })

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




export const deleteSaveForLaterProduct = (user, id) => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_SFL_PRODUCT_REQUEST',
      payload: { id }
    })

    try {
      await axios.put(urls.deleteSaveForLaterProduct, { id })
      return dispatch({
        type: 'DELETE_SFL_PRODUCT_SUCCESS',
        payload: { id }
      })
    } catch (e) {
      return dispatch({
        type: 'DELETE_SFL_PRODUCT_FAILURE',
        payload: { error: e.response.message }
      })
    }

  }
}