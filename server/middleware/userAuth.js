const jwt = require('jsonwebtoken');
const User = require('../models/User')
const userAuth = require('../config/userAuth');

const auth = async (req, res, next) => {
   try {
      const token = req.cookies['auth_token']
      const decodedToken = jwt.verify(token, userAuth.secret)
      const user = await User.findOne({ email: decodedToken.id, 'tokens.accessToken': token })

      if (!user)
         throw new Error()

      req.token = token
      req.user = user
      next();
  } catch (error) {
      res.status(401).send({ error: 'Não autorizado' })  //401: Unauthorized
   }
}

module.exports = auth