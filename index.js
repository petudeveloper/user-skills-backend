require('dotenv').config();
require('./config/database')
var express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

const User = require('./api/models/user');

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user1 = new User({ username: username, password: password });
  user1.save().then(() => console.log('user created successfully'));
});

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  User.find({ username: username, password: password }, (err, data) => {
    if (err) {
      res.send(err)
    }
    
    if (data.length > 0) {
      res.send(data)
    } else {
      res.send({ message: "Wrong username/password combination" })
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`)
});
