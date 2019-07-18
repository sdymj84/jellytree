const cors = require('cors')({ origin: true })
const db = require('../database')
const util = require('util')

const getProduct = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const productRef = await db.collection('products').doc(req.query.id)
      const doc = await productRef.get()
      if (!doc.exists) {
        console.log("No such product found")
        res.send("No such product found")
      }
      res.status(200).json(doc.data())
    } catch (e) {
      const msg = "Error getting a document"
      console.log(msg, e)
      res.status(500).json({ msg, err: e.response })
    }
  })
}

module.exports = getProduct
