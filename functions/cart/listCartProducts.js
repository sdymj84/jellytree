const cors = require('cors')({ origin: true })
const db = require('../database')

const listCartProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const snapshot = await db.collection('cart').get()
      if (snapshot.empty) {
        console.log("There's no product in cart")
      } else {
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data()
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

module.exports = listCartProducts
