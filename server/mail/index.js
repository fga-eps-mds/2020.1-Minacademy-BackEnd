const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAILHOG_HOST,
  port: '1025',
  auth: null
});

module.exports = transport