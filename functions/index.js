const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();
let db = admin.firestore();

const app = express();

app.get('/dogs/random', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  db.collection('dogs')
    .get()
    .then( (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
      res.json(snapshot);
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      res.status(500).json({ error: 'Error getting documents' });
    });

});

exports.app = functions.https.onRequest(app);
