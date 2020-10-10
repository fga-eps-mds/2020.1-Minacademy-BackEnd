const nodemailer = require('nodemailer');
const  hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transport = nodemailer.createTransport({
  host: process.env.MAILHOG_HOST,
  port: '1025',
  auth: null
});

 const handlebarsOptions = {
  viewEngine: 'express-handlebars',
  viewPath: './templates/'
  //extName: '.html'
};

transport.use('compile', hbs(handlebarsOptions)); 

module.exports = transport