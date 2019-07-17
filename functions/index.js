const functions = require('firebase-functions');

const listProducts = require('./products/listProducts')

module.exports = {
  'listProducts': functions.https.onRequest(listProducts)
}


// const functions = require('firebase-functions');
// const admin = require('firebase-admin')
// admin.initializeApp(functions.config().firebase);

// let db = admin.firestore();

// const cors = require('cors')({ origin: true })
// const _ = require('lodash')


// exports.listProducts = functions.https.onRequest(async (req, res) => {
//   cors(req, res, async () => {
//     db.collection('products').get()
//       .then((snapshot) => {
//         snapshot.forEach((doc) => {
//           console.log(doc.id, '=>', doc.data());
//         });
//       })
//       .catch((err) => {
//         console.log('Error getting documents', err);
//       });
//   })
// }) 