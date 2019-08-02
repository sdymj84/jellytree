const cors = require('cors')({ origin: true })
const db = require('../database')
const _ = require('lodash')

const updateCartProductQty = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { id, price, quantity } = req.body
      const updateDoc = await db.collection('cart').doc(id).set({
        quantity,
        totalPrice: Number(price) * Number(quantity),
      }, { merge: true })
      return res.status(200).json(updateDoc)
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

module.exports = updateCartProductQty
