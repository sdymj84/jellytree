const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const moveToSaveForLater = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { cartProducts } = req.body
      console.log('cartProduct : ', cartProducts)

      // Get a new write batch
      const batch = db.batch();

      cartProducts.forEach(cartProduct => {
        let saveForLaterRef = db.collection('saveForLater').doc(cartProduct.id)
        batch.set(saveForLaterRef, cartProduct)

        let deleteRef = db.collection('cart').doc(cartProduct.id)
        batch.delete(deleteRef)
      })

      // Commit the batch
      const result = await batch.commit()
      return res.status(200).json(result)

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

module.exports = moveToSaveForLater
