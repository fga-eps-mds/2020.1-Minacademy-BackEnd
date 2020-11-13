const nodemailer = require('nodemailer');
const nodemailerMock = require('nodemailer-mock');

let transport;

if (process.env.NODE_ENV === 'production') {
  transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mail.minacademy@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });
} else if (process.env.NODE_ENV === 'test') {
  transport = nodemailerMock.createTransport({
    host: 'qualquerhost',
    port: 'qualquerporta',
    auth: null,
  });
} else {
  transport = nodemailer.createTransport({
    host: process.env.MAILHOG_HOST,
    port: '1025',
    auth: null,
  });
}

module.exports = transport;
