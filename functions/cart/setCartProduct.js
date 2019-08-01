const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const setCartProduct = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { product, pid } = req.body
      console.log('product/pid : ', product, pid)
      const variation = _.find(product.variations, { 'pid': pid })
      console.log('variation : ', variation)


      /* 
        Create new cart product from variation
        Cart properties
        - id, pid, title, color, size, price, thumbnail
      */
      const cartProduct = {
        productId: product.id,
        pid: pid,
        title: variation.title,
        color: variation.color,
        size: variation.size,
        price: variation.price,
        thumbnail: variation.thumbnail,
        quantity: 1,
      }
      console.log('cartProduct : ', cartProduct)
      const id = uuidv1()
      const setDoc = await db.collection('cart').doc(id).set(cartProduct)

      return res.status(200).json({ ...cartProduct, id })

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

module.exports = setCartProduct
