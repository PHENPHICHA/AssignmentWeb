const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyA_5VyqvLxCRga8NQRCV-TeAeL1Xo4Fqmg",
  authDomain: "assignmentweb-634c5.firebaseapp.com",
  databaseURL: "https://assignmentweb-634c5.firebaseio.com",
  projectId: "assignmentweb-634c5",
  storageBucket: "assignmentweb-634c5.appspot.com",
  messagingSenderId: "445089831867"
};
firebase.initializeApp(config);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/bt21', (req, res) => {
  var bt21Ref = firebase.database().ref('bt21');
    bt21Ref.on('value', function(snapshot) {
        res.send(snapshot.val());
    });  
})

app.get('/bt21/:id', (req, res) => {
  var id = req.params.id
  firebase.database().ref('/bt21/' + id).once('value').then(function(snapshot) {
      res.send(snapshot.val());
    });
    
})

app.post('/bt21', (req, res) => {
    var id = req.body.id
    var name = req.body.name
    var by = req.body.by
    var price = req.body.price

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref('/bt21/' + id).set({
        id: id,
        name: name,
        by: by,
        price: price

    });
    res.send("Posted!");
 })

app.put('/bt21/:id', (req, res) => {





 })


app.delete('/bt21/:id', (req, res) => {
  
 }) 

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
