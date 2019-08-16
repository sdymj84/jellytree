const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const setCartProduct = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { newCartProduct } = req.body
      const setDoc = await db.collection('cart')
        .doc(newCartProduct.id).set(newCartProduct)

      return res.status(200).json(newCartProduct)

    } catch (e) {
      console.log(e)
      return res.status(500).json({
        name: e.name,
        message: e.message,
        stack: e.stack,
      })
    }
  })
}

module.exports = setCartProduct
