const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

let transport;

if (process.env.NODE_ENV === 'production') {
  transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mail.minacademy@gmail.com',
      pass: process.env.MAIL_PASSWORD,
    },
  });
} else {
  transport = nodemailer.createTransport({
    host: process.env.MAILHOG_HOST,
    port: '1025',
    auth: null,
  });
}

const handlebarsOptions = {
  viewEngine: 'express-handlebars',
  viewPath: './templates/',
  // extName: '.html'
};

transport.use('compile', hbs(handlebarsOptions));

module.exports = transport;
