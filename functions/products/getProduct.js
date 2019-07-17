const cors = require('cors')({ origin: true })
const _ = require('lodash')
const db = require('../database')

const getProduct = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const productRef = await db.collection('products').doc(req.params)
      const doc = await productRef.get()
      console.log(productRef)
      console.log(doc)
      res.json(doc)
    } catch (e) {
      const msg = "Error getting a document"
      console.log(msg, e)
      res.send(msg, e)
    }
  })
}

module.exports = getProduct
