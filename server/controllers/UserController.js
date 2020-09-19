const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');
const User = require('../models/User');
const userAuth = require('../config/userAuth')
const { findOne } = require('../models/User');

module.exports = {
    async getUsers(req, res, next) {
        const users = await User.find();
        return res.json(users);
    },

    async createUser(req, res, next) {
        try {
            const  email = req.body.email;
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'Email already used' });

            const class_body = await User.create(req.body);
            class_body.password = undefined;
            
            const acessToken = jwt.sign({id: email}, userAuth.secret, {
                expiresIn: 300
            });
            return res.send({class_body, acessToken});
        } catch (err) {
            return res.status(400).send({ error: 'Register Failed' });
        }
    },

    async authLogin(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password');

        if (user == null)
            return res.status(400).send({ error: 'Invalid Email or Password' });

        if (!bcrypt.compareSync(password, user.password))
            return res.status(400).send({ error: 'Invalid Email or Password' });

        user.password = undefined;

        try {
            const acessToken = jwt.sign({id: email}, userAuth.secret, {
                expiresIn: 300
            });
            return res.send({ user, acessToken });
        } catch (err) {
            return res.status(400).send({ error: 'Login Failed' });
        }
    },

    async authLogout(req, res, next) {
        res.send({ user, acesssToken: null });
    },
    
    async removeUser(req, res, next) {
        try {
            const { email } = req.body;
            const class_body = await User.findOneAndDelete({ email });
            return res.json(class_body);
            class_body.password = undefined;
        } catch (err) {
            return res.status(400).send({ error: 'Remove Failed' });
        }
    }
};