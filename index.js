require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./api/routes/userRoutes');
const app = express();
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const session = require('express-session');

connectDB();

app.use(express.json());

app.use(cors({origin:true,credentials: true}));

app.use(cookieParser());

app.use(session({
  key: "userId",
  secret: "torreCo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}));

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${process.env.PORT}`)
});
