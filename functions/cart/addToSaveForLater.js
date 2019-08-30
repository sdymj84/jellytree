const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const addToSaveForLater = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { cartProduct } = req.body
      console.log('cartProduct : ', cartProduct)
      await db.collection('saveForLater').doc(cartProduct.id).set(cartProduct)

      return res.status(200).json(cartProduct)

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

module.exports = addToSaveForLater
