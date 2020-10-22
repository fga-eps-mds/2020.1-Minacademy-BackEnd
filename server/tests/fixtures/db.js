const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userAuth = require('../../config/userAuth.json');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Maria',
  lastname: 'Cleia',
  gender: 'Female',
  email: 'maria@gmail.com',
  password: '44444dsasa',
  userType: 'Learner',
  tokens: [
    {
      accessToken: jwt.sign({ id: userOneId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign({ id: 'maria@gmail.com' }, userAuth.secretResetPassword),
};

const answerKey = {
  user: userOneId,
  answers: [
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000067'),
      alternative: 'a',
      isCorrect: false,
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'joao',
  email: 'joao@mail.com',
  lastname: 'Pedro',
  gender: 'Male',
  userType: 'Mentor',
  password: 'joao2727',
  tokens: [
    {
      accessToken: jwt.sign({ id: userTwoId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign({ id: 'joao@mail.com' }, userAuth.secretResetPassword),
};

module.exports = {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  answerKey,
};
