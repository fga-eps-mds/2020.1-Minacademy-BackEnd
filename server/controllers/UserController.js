const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const userAuth = require('../config/userAuth');
const transport = require('../mail/index');

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
      if (req.body.email) {
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
        const data = {
          from: 'minAcademy@minAcademy.com',
          to: email,
          subject: 'Redefinição de Email',
          html: `
          <html>
    <body>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');
        
        body {
          background-color: #F5F5F5;
        }
  
        .box_text {
          min-height: 50vh;
          padding: 3em;
          background: #FFFFFF;
          box-shadow: 0px 5px 10px rgba(43, 43, 43, 0.05), 0px 15px 40px rgba(0, 0, 0, 0.02);
          border-radius: 10px;
          margin-bottom: 3rem;
        }
  
        hr {
          border: 1px solid #9241C0;
        }
  
        h1 {
          color: #9241C0;
          box-sizing: border-box;
          font-family: Overpass;
        }
  
        p {
          color: #675775;
          font-weight: 300;
          font-family: Overpass;
          text-align: left;
          font-size: 1.5vw;
        }
  
        img {
          position: absolute;
          right: 50px;
        }
      </style>
      <div class="box_text">
        <div class="email-header">
          <img src='https://raw.githubusercontent.com/fga-eps-mds/2020.1-Minacademy-FrontEnd/0395eb8b413765722f8b9c766020562608276217/src/assets/images/minacademyLogo.svg'>
          <h1>Redefinição de Email</h1>
        </div>
        <hr>
        <p>Olá, foi voce quem pediu pra mudar seu endereço de email? Isso é facil pra gente!.</p>
        <p>Clique <a href="http://localhost:3000/confirma-mudanca-email/${changeEmailLink}">aqui</a> para confirmar a mudança.</p>
      </div>
    </body>
  </html>`,
        };
        req.user.showMessageConfirm = true;
        await transport.sendMail(data);
      }
      updates.forEach((field) => (req.user[field] = req.body[field]));
      await req.user.save();
      res.send(req.user);
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
      const data = {
        from: 'minAcademy@minAcademy.com',
        to: email,
        subject: 'Redefinição de Senha',
        html: `
        <html>
  <body>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');
      
      body {
        background-color: #F5F5F5;
      }

      .box_text {
        min-height: 50vh;
        padding: 3em;
        background: #FFFFFF;
        box-shadow: 0px 5px 10px rgba(43, 43, 43, 0.05), 0px 15px 40px rgba(0, 0, 0, 0.02);
        border-radius: 10px;
        margin-bottom: 3rem;
      }

      hr {
        border: 1px solid #9241C0;
      }

      h1 {
        color: #9241C0;
        box-sizing: border-box;
        font-family: Overpass;
      }

      p {
        color: #675775;
        font-weight: 300;
        font-family: Overpass;
        text-align: left;
        font-size: 1.5vw;
      }

      img {
        position: absolute;
        right: 50px;
      }
    </style>
    <div class="box_text">
      <div class="email-header">
        <img src='https://raw.githubusercontent.com/fga-eps-mds/2020.1-Minacademy-FrontEnd/0395eb8b413765722f8b9c766020562608276217/src/assets/images/minacademyLogo.svg'>
        <h1>Redefinição de senha</h1>
      </div>
      <hr>
      <p>Olá, ficamos sabendo que você esqueceu a sua senha, mas não se preocupe, estamos aqui para ajudar.</p>
      <p>Para ser redirecionado(a) para a página de redefinição de senha clique <a href="http://localhost:3000/change/${resetLink}">aqui</a>.</p>
    </div>
  </body>
</html>`,
      };

      await transport.sendMail(data);
      res.send({ message: 'A e-mail has sent to you, verify it' });
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
