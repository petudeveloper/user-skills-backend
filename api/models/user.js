const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: String,
    password: String,
  },
  {"strict": "throw"}
);

const User =  mongoose.model('User', userSchema);

module.exports = User;
