const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')

const setProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body
      console.log(data)

      // Data validation
      data.forEach(product => {
        if (product.sku.trim() === "") {
          throw new Error("SKU cannot be empty.")
        }
      })

      // Get a new write batch
      const batch = db.batch();

      data.forEach(product => {
        // Set the value of each product
        let productRef = db.collection('products').doc(product.id || uuidv1());
        batch.set(productRef, product);
      })

      // Commit the batch
      const result = await batch.commit()
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

module.exports = setProducts
