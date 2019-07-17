const cors = require('cors')({ origin: true })
const _ = require('lodash')
const db = require('../database')

const listProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const snapshot = await db.collection('products').get()
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          data: doc.data()
        })
      })
      res.status(200).json(result)
      // res.json(result)
    } catch (e) {
      const msg = "Error getting documents"
      console.log(msg, e)
      res.send(msg, e)
    }
  })
}

module.exports = listProducts
