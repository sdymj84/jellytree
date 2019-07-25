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
        return res.send("No such product found")
      }
      return res.status(200).json(doc.data())
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

module.exports = getProduct
