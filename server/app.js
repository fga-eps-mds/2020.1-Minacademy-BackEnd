const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const userRouter = require('./routes')
const questionRouter = require('./routers/question')
const moduleRouter = require('./routers/module')
require('dotenv').config();

const app = express();

app.use(cors({
  //To allow requests from client
  origin: [
    "http://localhost:3000"
  ],
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
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(userRouter);
app.use(questionRouter);
app.use(moduleRouter)

module.exports = app;

// app.listen(process.env.PORT != null ? process.env.PORT : 9000, () => {
//   console.log('Server started on port ' + process.env.PORT + '!');
// });