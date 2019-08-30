const initialState = {
  saveForLaterProducts: []
}

export const saveForLaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIST_SFL_PRODUCTS_REQUEST':
      return {
        ...state,
        isLoading: true,
      }
    case 'LIST_SFL_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        saveForLaterProducts: action.payload.saveForLaterProducts
      }
    case 'LIST_SFL_PRODUCTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }


    case 'ADD_SFL_PRODUCT_REQUEST':
      return {
        ...state,
        saveForLaterProducts: [...state.saveForLaterProducts, { isLoading: true }]
      }
    case 'ADD_SFL_PRODUCT_SUCCESS':
      return {
        ...state,
        saveForLaterProducts: state.saveForLaterProducts.filter(product => product.isLoading !== true)
          .concat(action.payload.newSaveForLaterProduct)
      }
    case 'ADD_SFL_PRODUCT_FAILURE':
      return {
        ...state,
        saveForLaterProducts: state.saveForLaterProducts.filter(product => product.isLoading !== true)
          .concat(action.payload.error)
      }


    // TODO: work on delete on 'move to cart' event
    case 'DELETE_SFL_PRODUCT_REQUEST':
      return {
        ...state,
        saveForLaterProducts: state.saveForLaterProducts.map(product =>
          product.id === action.payload.id
            ? { ...product, isLoading: true }
            : product
        )
      }
    case 'DELETE_SFL_PRODUCT_SUCCESS':
      return {
        ...state,
        saveForLaterProducts: state.saveForLaterProducts.filter(product =>
          product.id !== action.payload.id
        )
      }
    case 'DELETE_SFL_PRODUCT_FAILURE':
      return {
        ...state,
        saveForLaterProducts: state.saveForLaterProducts.map(product =>
          product.id === action.payload.id
            ? { ...product, error: action.payload.error }
            : product
        )
      }

    default:
      return state
  }
}
