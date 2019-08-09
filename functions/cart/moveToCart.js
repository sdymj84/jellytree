const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const moveToCart = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { product } = req.body
      await db.collection('cart').doc(product.id).set(product)
      await db.collection('saveForLater').doc(product.id).delete()

      return res.status(200).json(product)

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

module.exports = moveToCart
