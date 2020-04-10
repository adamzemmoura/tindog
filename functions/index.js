const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);
var db = firebaseApp.firestore();

const app = express();

app.get('/dogs/random', (req, res) => {
  // Max excluded
  const max = 3;
  // Min included
  const min = 1;
  const randomID = Math.floor(Math.random() * (max - min)) + min;
  db.collection("dogs").doc(`${randomID}`).get().then((doc) => {
    if (doc.exists) {
      res.send(doc.data())
    }
    else {
      res.status(404).send('Dog not found');
    }
  })
});

app.get('/dogs/:id', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  db.collection("dogs").doc(`${req.params.id}`).get().then((doc) => {
    if (doc.exists) {
      res.send(doc.data())
    }
    else {
      res.status(404).send('Dog not found');
    }
  }).catch((err) => {
    res.status(500).send(`Error fetching dogs: ${err}`);
  })
});

exports.app = functions.https.onRequest(app);
