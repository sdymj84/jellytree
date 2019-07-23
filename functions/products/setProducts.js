const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')

const setProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body
      console.log(data)

      // Get a new write batch
      const batch = db.batch();

      data.map(product => {
        // Set the value of each product
        let productRef = db.collection('products').doc(product.id || uuidv1());
        batch.set(productRef, product);
      })

      // Commit the batch
      const result = await batch.commit()
      res.status(200).json(result)

    } catch (e) {
      const msg = "Error setting documents"
      console.log(msg, e)
      res.status(500).json({ msg, e })
    }
  })
}

module.exports = setProducts
