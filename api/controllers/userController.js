const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err)
      res.status(500).json({message: "Server Error"})
    }
    const user1 = new User({ username: username, password: hash });
    user1.save().then(() => res.send("User created succesfully"));
  })
};

const saveSession = (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false, user: req.session.user})
  }
}

const loginUser = (req, res) => {
  const username = req.body.username
  const password = req.body.password

  User.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
    }
    
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (response) {
          req.session.user = data;
          console.log(req.session.user);
          res.send(data)
        } else {
          res.send({ message: "Wrong username/password combination" })
        }
      })
    } else {
      res.send({ message: "User doesn't exist" })
    }
  });
};

module.exports = {
  registerUser,
  saveSession,
  loginUser,
};
