/* 
  firebase config info
    - client needs to request info to me
      because it's not safe for client to have secret keys
*/

const cors = require('cors')({ origin: true })
const functions = require('firebase-functions');

const getConfig = async (req, res) => {
  cors(req, res, async () => {
    return res.status(200).json(functions.config().fbconfig)
  })
}

module.exports = getConfig
