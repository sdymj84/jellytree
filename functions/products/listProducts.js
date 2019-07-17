const cors = require('cors')({ origin: true })
const _ = require('lodash')
const db = require('../database')

const listProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const snapshot = await db.collection('products').get()
      _.forEach(snapshot, doc => {
        result.push({
          id: doc.id,
          data: doc.data()
        })
      })
      res.json(result)
    } catch (e) {
      const msg = "Error getting documents"
      console.log(msg, e)
      res.send(msg, e)
    }
  })
}

module.exports = listProducts
