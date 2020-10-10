const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userAuth = require('../config/userAuth');

module.exports = {
    async getUsers(req, res) {
        const users = await User.find();
        return res.json(users);
    },

    async getIsEmailUsed(req, res) {
        try {
            const { email } = req.query
            const user = await User.findOne({ email });
            const isUsed = user ? true : false;
            res.send(isUsed);
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            const accessToken = jwt.sign({ id: user.email }, userAuth.secret);
            user.tokens = user.tokens.concat({ accessToken })
            await user.save()
            res.cookie('auth_token', accessToken)
            return res.status(201).send({ user, accessToken });
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

    async authLogin(req, res) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error('Invalid Email or Password')
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new Error('Invalid Email or Password')
            }

            const accessToken = jwt.sign({ id: user.email }, userAuth.secret);
            user.tokens = user.tokens.concat({ accessToken })
            await user.save()
            res.cookie('auth_token', accessToken, { httpOnly: true })
            res.send({ user, accessToken })
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

    async authLogout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => token.accessToken !== req.token);
            await req.user.save();
            res.clearCookie('auth_token');
            res.send({ logout: 'Logged out' });
        } catch (error) {
            res.status(401).send(error);
        }
    },

    async removeUser(req, res) {
        try {
            const { _id } = req.body;
            const user = await User.findOneAndDelete({ _id });
            user.password = undefined;
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).send({ error: 'Remove Failed' });
        }
    },

    async editUser(req, res) {
        const update = {
            name: req.body.name, email: req.body.email, about: req.body.about, profileImg: req.body.profileImg,
        };
        User.findByIdAndUpdate({ _id: req.user.id }, update, { new: true, runValidators: true },
            (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err);
                } else {
                    res.send(result);
                }
            })
    },

    async changeToLearner(req, res) {
        console.log(req.user.gender);
        req.user.gender === "Female" ? User.findByIdAndUpdate(
            { _id: req.user.id }, { userType: "learner" },
            { new: true, runValidators: true },
            function (err, result) {
                if (err) {
                    res.status(400).send(err)
                }
                else {
                    res.send(result)
                }
            }) : res.status(400).send({ err: "Male can't be a learner" });
    }
}
