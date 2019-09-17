const functions = require('firebase-functions');

const getConfig = require('./getConfig')

const listProducts = require('./products/listProducts')
const getProduct = require('./products/getProduct')
const setProducts = require('./products/setProducts')

const listCartProducts = require('./cart/listCartProducts')
const setCartProduct = require('./cart/setCartProduct')
const deleteCartProduct = require('./cart/deleteCartProduct')
const updateCartProductQty = require('./cart/updateCartProductQty')
const moveToSaveForLater = require('./cart/moveToSaveForLater')
const addToSaveForLater = require('./cart/addToSaveForLater')
const batchMoveToSaveForLater = require('./cart/batchMoveToSaveForLater')
const listSaveForLaterProducts = require('./cart/listSaveForLaterProducts')
const deleteSaveForLaterProduct = require('./cart/deleteSaveForLaterProduct')
const moveToCart = require('./cart/moveToCart')

const setUser = require('./user/setUser')

const billing = require('./billing/billing')


module.exports = {
  'getConfig': functions.https.onRequest(getConfig),
  'listProducts': functions.https.onRequest(listProducts),
  'getProduct': functions.https.onRequest(getProduct),
  'setProducts': functions.https.onRequest(setProducts),
  'listCartProducts': functions.https.onRequest(listCartProducts),
  'setCartProduct': functions.https.onRequest(setCartProduct),
  'deleteCartProduct': functions.https.onRequest(deleteCartProduct),
  'updateCartProductQty': functions.https.onRequest(updateCartProductQty),
  'addToSaveForLater': functions.https.onRequest(addToSaveForLater),
  'moveToSaveForLater': functions.https.onRequest(moveToSaveForLater),
  'batchMoveToSaveForLater': functions.https.onRequest(batchMoveToSaveForLater),
  'listSaveForLaterProducts': functions.https.onRequest(listSaveForLaterProducts),
  'deleteSaveForLaterProduct': functions.https.onRequest(deleteSaveForLaterProduct),
  'moveToCart': functions.https.onRequest(moveToCart),
  'setUser': functions.https.onRequest(setUser),
  'billing': functions.https.onRequest(billing),
}

