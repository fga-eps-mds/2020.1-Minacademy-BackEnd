const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const userAuth = require('../config/userAuth');
const auth = require('../middleware/userAuth')
const { find } = require('../models/User');
const transport = require('../mail/index');

module.exports = {
    async getUsers(req, res) {
        if(req.query.email){
            const { email } = req.query;
            const user = await User.findOne({ email });
            user ? res.send(true) : res.send(false);
        }
        const users = await User.find();
        return res.json(users);
    },

    async createUser(req, res) {
        try {
            req.body.gender == "Male" ? req.body.userType = "Mentor" : null;
            req.body.userType == "Mentor" ? req.body.isValidated = false : null;
            const user = await User.create(req.body);
            const accessToken = jwt.sign({ id: user.email }, userAuth.secret);
            user.tokens = user.tokens.concat({ accessToken });
            await user.save();
            res.cookie('auth_token', accessToken);
            return res.status(201).send({ user, accessToken });
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

    async authLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid Email or Password');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid Email or Password');
            }

            const accessToken = jwt.sign({ id: user.email }, userAuth.secret);
            user.tokens = user.tokens.concat({ accessToken });
            await user.save();
            res.cookie('auth_token', accessToken, { httpOnly: true });
            res.send({ user, accessToken });
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
        const update = req.body;
        User.findOneAndUpdate({ _id: req.user.id }, update, { new: true, runValidators: true },
            (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.status(400).send(err);
                } else {
                    res.send(result);
                }
            })
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        User.findOne({ email }, (err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: "User with this email does not exist." });
            }

            const resetToken = jwt.sign({ _id: user._id }, userAuth.secretResetPassword, { expiresIn: '60m' });
            const data = {
                from: 'minAcademy@minAcademy.com',
                to: email,
                //template: 'forgotPassword',
                subject: 'Redefinição de Senha',
                //template: 'forgotPassword'
                html: ` 
                    <div >
                        <div>
                            <div class="box_text"> 
                                <h1>Redefinição de senha</h1>
                                <p>Você solicitou a redefinição de senha. Click <a href="http://localhost:3000/change/${resetToken}">aqui</a> para redefinir sua senha.</p>
                            </div>
                        </div>
            
                    </div>
                      `
            };

            return user.updateOne({ resetLink: resetToken }, (error, success) => {
                if (err) {
                    return res.status(400).json({ error: "reset password link error" });
                } else {
                    transport.sendMail(data, (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json({ error: "Could not send Email." });

                        }

                        return res.status(200).json({ message: 'A e-mail has sent to you, verify it' })
                    });
                }

            });
        });
    },

    async resetPassword(req, res) {
        const { password, resetLink } = req.body;
        //console.log("PPPPPAAARAMENTOS: ", req.params);
        //const {resetLink} = req.params;
        //console.log(req.user);
        if (resetLink) {
            //console.log("resetLink existe");
            jwt.verify(resetLink, userAuth.secretResetPassword, (err, decodedData) => {
                if (err) {
                    //console.log(err); 
                    console.log("resetLink errado");
                    return res.json({ error: "Incorrect token or it is expired." });
                }
                User.findOne({ resetLink }, (err, user) => {
                    if (err || !user) {
                        console.log(user);
                        return res.status(400).json({ error: "User with this token does not exist." });
                    }
                    const obj = {
                        password: password,
                        resetLink: ''
                    }

                    user.password = password;
                    user.save((err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json({ error: "reset password error" });
                        } else {
                            return res.status(200).json({ message: 'Your password has been changed' })

                        }
                    })
                })
            })
        } else {
            console.log("resetLink nao existe");
            return res.status(401).json({ error: "Authentication error" });
        }
    }
};





