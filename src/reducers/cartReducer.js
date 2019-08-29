const initialState = {
  cartProducts: []
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_CART_PRODUCTS_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'LIST_CART_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        cartProducts: action.payload.cartProducts
      }
    case 'LIST_CART_PRODUCTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}
