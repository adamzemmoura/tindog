const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/dogs/random', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  // TODO: retrieve random dog from Firestore and send JSON response
  res.send('random cached dog');
});

exports.app = functions.https.onRequest(app);
