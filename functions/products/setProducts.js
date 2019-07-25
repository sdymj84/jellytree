const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')

const setProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body
      console.log(data)

      // Data validation
      data.map(product => {
        if (product.sku.trim() === "") {
          throw new Error("SKU cannot be empty.")
        }
      })

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
      console.log(e)
      res.status(500).json({ error: e })
    }
  })
}

module.exports = setProducts
