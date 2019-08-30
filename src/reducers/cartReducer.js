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


    case 'ADD_CART_PRODUCT_REQUEST':
      return {
        ...state,
        cartProducts: [...state.cartProducts, { isLoading: true }]
      }
    case 'ADD_CART_PRODUCT_SUCCESS':
      return {
        ...state,
        cartProducts: state.cartProducts.filter(product => product.isLoading !== true)
          .concat(action.payload.newCartProduct)
      }
    case 'ADD_CART_PRODUCT_FAILURE':
      return {
        ...state,
        cartProducts: state.cartProducts.filter(product => product.isLoading !== true)
          .concat(action.payload.error)
      }


    case 'UPDATE_CART_PRODUCT_QTY_REQUEST':
      return {
        ...state,
        cartProducts: state.cartProducts.map(product =>
          product.id === action.payload.id
            ? { ...product, isLoading: true }
            : product
        )
      }
    case 'UPDATE_CART_PRODUCT_QTY_SUCCESS':
      return {
        ...state,
        cartProducts: state.cartProducts.map(product =>
          product.id === action.payload.id
            ? {
              ...product,
              quantity: action.payload.quantity,
              totalPrice: Number(product.price) * Number(action.payload.quantity),
              isLoading: false,
            }
            : product
        )
      }
    case 'UPDATE_CART_PRODUCT_QTY_FAILURE':
      return {
        ...state,
        cartProducts: state.cartProducts.map(product =>
          product.id === action.payload.id
            ? {
              ...product,
              error: action.payload.error,
              isLoading: false,
            }
            : product
        )
      }


    case 'DELETE_CART_PRODUCT_REQUEST':
      return {
        ...state,
        cartProducts: state.cartProducts.map(product =>
          product.id === action.payload.id
            ? { ...product, isLoading: true }
            : product
        )
      }
    case 'DELETE_CART_PRODUCT_SUCCESS':
      return {
        ...state,
        cartProducts: state.cartProducts.filter(product =>
          product.id !== action.payload.id
        )
      }
    case 'DELETE_CART_PRODUCT_FAILURE':
      return {
        ...state,
        cartProducts: state.cartProducts.map(product =>
          product.id === action.payload.id
            ? { ...product, error: action.payload.error }
            : product
        )
      }

    default:
      return state
  }
}
