const functions = require('firebase-functions');

const listProducts = require('./products/listProducts')
const getProduct = require('./products/getProduct')
const setProducts = require('./products/setProducts')

module.exports = {
  'listProducts': functions.https.onRequest(listProducts),
  'getProduct': functions.https.onRequest(getProduct),
  'setProducts': functions.https.onRequest(setProducts)
}

