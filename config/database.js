const mongoose = require('mongoose');

mongoose.connect(process.env.MDB_CONNECTION_STRING)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));
