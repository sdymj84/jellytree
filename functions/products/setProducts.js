const cors = require('cors')({ origin: true })
const db = require('../database')

const setProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body
      console.log(data)
      const result = await db.collection('products').doc(data.id).set(data)
      res.status(200).json(result)
    } catch (e) {
      const msg = "Error setting documents"
      console.log(msg, e)
      res.status(500).json({ msg, e })
    }
  })
}

module.exports = setProducts
