const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

            const user = await User.create(req.body);
            user.password = undefined;
            
            const accessToken = jwt.sign({id: email}, userAuth.secret, {
                expiresIn: 300
            });
            return res.status(201).send({user, accessToken});
        } catch (err) {
            return res.status(400).send({ error: err.message });
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
            const accessToken = jwt.sign({id: email}, userAuth.secret, {
                expiresIn: 300
            });
            return res.status(201).send({ user, accessToken });
        } catch (err) {
            return res.status(400).send({ error: 'Login Failed' });
        }
    },

    async authLogout(req, res, next) {
        res.send({ user, accessToken: null });
    },
    
    async removeUser(req, res, next) {
        try {
            const { _id } = req.body;
            const user = await User.findOneAndDelete({ _id });
            user.password = undefined;
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).send({ error: 'Remove Failed' });
        }
    }
};