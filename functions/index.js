const functions = require('firebase-functions');

const listProducts = require('./products/listProducts')
const getProduct = require('./products/getProduct')
const setProducts = require('./products/setProducts')
const listCartProducts = require('./cart/listCartProducts')
const setCartProduct = require('./cart/setCartProduct')

module.exports = {
  'listProducts': functions.https.onRequest(listProducts),
  'getProduct': functions.https.onRequest(getProduct),
  'setProducts': functions.https.onRequest(setProducts),
  'listCartProducts': functions.https.onRequest(listCartProducts),
  'setCartProduct': functions.https.onRequest(setCartProduct),
}

