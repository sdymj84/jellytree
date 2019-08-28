import { createStore, action } from "easy-peasy";

const cartModel = {
  cartProducts: [
    {
      id: '123',
      title: 'Baby bonnet',
      price: '10.99',
    }
  ],

  addProduct: action((state, payload) => {
    state.cartProducts.push(payload)
  })
}

const storeModel = {
  cart: cartModel
}

export const store = createStore(storeModel)