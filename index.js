require('dotenv').config();
require('./config/database')
var express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors());

const User = require('./api/models/user');

app.post('/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    }
    const user1 = new User({ username: username, password: hash });
    user1.save().then(() => res.send("User created succesfully"));
  })

});

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  User.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
    }
    
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (response) {
          res.send(data)
        } else {
          res.send({ message: "Wrong username/password combination" })
        }
      })
    } else {
      res.send({ message: "User doesn't exist" })
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`)
});
