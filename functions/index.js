const functions = require('firebase-functions');

const listProducts = require('./products/listProducts')
const getProduct = require('./products/getProduct')

module.exports = {
  'listProducts': functions.https.onRequest(listProducts),
  'getProduct': functions.https.onRequest(getProduct)
}

