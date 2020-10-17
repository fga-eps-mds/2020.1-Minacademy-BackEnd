const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable no-console
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
  console.log('DB connected');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

module.exports = app;
