const cors = require('cors')({ origin: true })
const db = require('../database')
const _ = require('lodash')

const setUser = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { user } = req.body
      const setDoc = await db.collection('users')
        .doc(user.uid).set(user)

      return res.status(200).json(user)

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

module.exports = setUser
