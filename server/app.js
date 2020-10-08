const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
const questionRouter = require('./routers/question');
const moduleRouter = require('./routers/module');
const asnwerRouter = require('./routers/answer');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ["set-cookie"]
}));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
  console.log("DB connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(userRouter);
app.use(questionRouter);
app.use(moduleRouter);
app.use(asnwerRouter);

module.exports = app;
