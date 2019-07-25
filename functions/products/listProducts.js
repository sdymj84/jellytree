const cors = require('cors')({ origin: true })
const db = require('../database')

const listProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const snapshot = await db.collection('products').get()
      if (snapshot.empty) {
        console.log("There's no product")
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
      // const msg = "Error getting documents"
      // console.log(msg, e)
      // res.status(500).json({ msg, e })
      console.log(e)
      return res.status(500).json({
        name: e.name,
        message: e.message,
        stack: e.stack,
      })
    }
  })
}

module.exports = listProducts
