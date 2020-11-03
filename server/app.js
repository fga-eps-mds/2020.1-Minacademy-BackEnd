const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const { io } = require('./websocket');
require('./db/mongoose');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  req.io = io.of('/api');
  next();
});
app.use('/api', router);

const server = http.createServer(app);
io.listen(server);

module.exports = server;
