const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const userRouter = require('./routes')
require('dotenv').config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
    console.log("DB connected");
});

app.use(express.json());
app.use(userRouter);

if (process.env.NODE_ENV == 'test'){}
    process.env.PORT = 0;

server = app.listen(process.env.PORT != null ? process.env.PORT : 9000, () => {
    console.log('Server started on port ' + process.env.PORT + '!');
});

module.exports = server;
