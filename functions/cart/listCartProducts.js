const cors = require('cors')({ origin: true })
const db = require('../database')
const _ = require('lodash')

const listCartProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const result = []
      const cartSnapshot = await db.collection('cart').get()
      if (cartSnapshot.empty) {
        console.log("There's no product in cart")
      } else {
        await Promise.all(cartSnapshot.docs.map(async cartDoc => {
          const productId = cartDoc.data().productId
          const pid = cartDoc.data().pid
          const productRef = await db.collection('products').doc(productId)
          const productDoc = await productRef.get()

          productRef.onSnapshot(docSnapshot => {
            const product = docSnapshot.data()
            const stock = _.find(product.variations, { 'pid': pid }).stock
            console.log('stock : ', stock)
          })

          let stock = ""
          if (!productDoc.exists) {
            stock = '0'
          } else {
            const product = productDoc.data()
            stock = _.find(product.variations, { 'pid': pid }).stock
          }

          result.push({
            id: cartDoc.id,
            stock,
            ...cartDoc.data()
          })
        }))
      }
      console.log(result)
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
