const cors = require('cors')({ origin: true })
const db = require('../database')
const _ = require('lodash')

const listSaveForLaterProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { uid } = req.body
      const result = []
      // Receive uid from client and query that user's saveForLater > return
      const cartSnapshot = await db.collection('saveForLater')
        .where('uid', '==', uid).get()
      if (cartSnapshot.empty) {
        console.log("There's no product in Save For Later")
      } else {
        cartSnapshot.forEach(cartDoc => {
          result.push({
            id: cartDoc.id,
            ...cartDoc.data()
          })
        })
      }
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

module.exports = listSaveForLaterProducts
