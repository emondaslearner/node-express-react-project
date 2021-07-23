const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9pksi.mongodb.net/hotal?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

var serviceAccount = require("./config/hotal-booking-b16c2-firebase-adminsdk-w0xr3-c81ae52f6a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.URL
});


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("hotal").collection("hotaldata");
  app.post('/add',(req,res) => {
      collection.insertOne(req.body);
  })

  app.get('/orders',(req,res) => {
      const authorToken = req.headers.authorization;
      if(authorToken){
        const check = authorToken.split(' ')[1];
        admin.auth()
        .verifyIdToken(check)
        .then((decodedToken) => {
          const uid = decodedToken.email;
            console.log(req.query.email);
            collection.find({})
            .toArray((err,document) => {
              const find = document.filter(data => data.email === req.query.email);
              res.send(find);
            })
          // ...
        })
        .catch((error) => {
          // Handle error

        });
      }else{
        res.status(401).send('un-authorized access')
      }
  })
});

app.listen(3500);