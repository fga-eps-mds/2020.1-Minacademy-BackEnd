const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable no-console
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:')); // eslint-disable-line no-console
db.once('open', () => {
  console.log('DB connected'); // eslint-disable-line no-console
});
