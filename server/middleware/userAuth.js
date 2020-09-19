const jwt = require('jsonwebtoken');
const userAuth = require('../config/userAuth');

module.exports = (req, res, next) => {
   try {
      const token = req.header('Authorization').replace('Bearer', '').trim();
      if(!token) return res.status(401).send({ Error: 'Token empty'});
      
      jwt.verify(token, userAuth.secret, (err, decoded) => {
         if(err) return res.status(401).send({Error: 'Token Invalid'});

         req.userID = decoded.id;
      });
      return next();

  } catch (error) {
      res.status(401).send({ Error: 'Please authenticate' })  //401: Unauthorized
   }
}