const cors = require('cors')({ origin: true })
const _ = require('lodash')
const stripePackage = require('stripe')
const functions = require('firebase-functions');

const billing = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { amount, source } = req.body

      const stripe = stripePackage(functions.config().stripe.secretkey)

      const paymentRes = await stripe.charges.create({
        source,
        amount,
        description: "Purchase",
        currency: "usd"
      })
      console.log("payment result : ", paymentRes)

      return res.status(200).json({
        amount, source, paymentRes
      })

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

module.exports = billing
