const cors = require('cors')({ origin: true })
const db = require('../database')
const _ = require('lodash')

const deleteSaveForLaterProduct = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { id } = req.body
      const deleteDoc = await db.collection('saveForLater').doc(id).delete()
      return res.status(200).json(deleteDoc)
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

module.exports = deleteSaveForLaterProduct
