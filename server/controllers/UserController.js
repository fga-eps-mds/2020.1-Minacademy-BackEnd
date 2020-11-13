const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userAuth = require('../config/userAuth');
const transport = require('../mail/index');
const mail = require('../mail/data');

module.exports = {
  async getUsers(req, res) {
    if (req.query.email) {
      const { email } = req.query;
      const user = await User.findOne({ email });
      res.send({ user });
    } else {
      const users = await User.find();
      return res.send(users);
    }
  },

  async createUser(req, res) {
    try {
      if (req.body.gender === 'Male') req.body.userType = 'Mentor';
      const user = await User.create(req.body);
      const accessToken = jwt.sign({ id: user._id }, userAuth.secret);
      user.tokens = user.tokens.concat({ accessToken });
      console.log("secretRegister", userAuth.secretRegister);
      const registerLink = jwt.sign(
        { _id: user._id },
        userAuth.secretRegister,
        { expiresIn: '60m' },
      );
      user.registerLink = registerLink;
      console.log("USUARIOOOOOO:", user);
      await user.save();
      res.cookie('auth_token', accessToken);
      const data = mail.registerConfirm(user.email, user.name, registerLink);
      await transport.sendMail(data);
      return res.status(201).send({ user, accessToken });
    } catch (err) {
      console.log("ERRRRROOORR",err);
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

      const accessToken = jwt.sign({ id: user._id }, userAuth.secret);
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
      req.user.tokens = req.user.tokens
        .filter((token) => token.accessToken !== req.token);
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
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'email',
      'lastname',
    ];
    const isValidOperation = updates.every((item) => allowedUpdates.includes(item));

    if (!isValidOperation) return res.status(400).send({ Error: 'Invalid updates!' });

    try {
      /* eslint-disable no-return-assign */
      if (req.body.email !== req.user.email) {
        const index = updates.indexOf('email');
        if (index > -1) updates.splice(index, 1);
        const { email } = req.user;
        const newEmail = req.body.email;
        req.user.changeEmail = newEmail;
        const changeEmailLink = jwt.sign(
          { _id: req.user._id },
          userAuth.secretChangeEmail,
          { expiresIn: '60m' },
        );
        req.user.changeEmailLink = changeEmailLink;
        const data = mail.changeEmailLink(newEmail, changeEmailLink);
        req.user.showMessageConfirm = true;
        await transport.sendMail(data);
      }
      updates.forEach((field) => (req.user[field] = req.body[field]));
      await req.user.save();
      let emailChange = false;
      if (req.body.email !== req.user.email) emailChange = true;
      res.send({ user: req.user, emailChange });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('There is no such email in our platform');
      const resetLink = jwt.sign(
        { _id: user._id },
        userAuth.secretResetPassword,
        { expiresIn: '60m' },
      );
      user.resetLink = resetLink;
      await user.save();
      const data = mail.resetLink(email, resetLink);

      await transport.sendMail(data);
      res.status(200).send({ message: 'A e-mail has sent to you, verify it' });
    } catch (error) {
      console.log('EMAIL ERROR: ', error.message); // eslint-disable-line no-console
      res.status(400).send({ error, message: error.message });
    }
  },

  async resetPassword(req, res) {
    const { password, resetLink, confirmPassword } = req.body;
    try {
      const decodedID = jwt.verify(resetLink, userAuth.secretResetPassword);
      const user = await User.findById(decodedID);
      if (!user) throw new Error('User does not exist');
      if (password !== confirmPassword) throw new Error('Passwords do not coincide');
      if (!user.resetLink) throw new Error('You already changed your password');
      user.password = password;
      user.resetLink = null;
      await user.save();
      res.send({ message: 'Your password has been changed' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async changeEmail(req, res) {
    try {
      const { changeEmailLink } = req.body;
      const decodedID = jwt.verify(changeEmailLink, userAuth.secretChangeEmail);
      const user = await User.findById(decodedID);
      if (!user) throw new Error('User does not exist');
      if (!user.changeEmailLink) throw new Error('You already changed your email');
      const newEmail = user.changeEmail;
      user.changeEmail = '';
      await user.save();
      user.email = newEmail;
      user.changeEmailLink = '';
      user.showMessageConfirm = false;
      await user.save();
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};
