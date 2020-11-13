const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userAuth = require('../../config/userAuth.json');
const { learnerThreeId, learnerFourId, learnerFiveId } = require('./learner');

const mentorOneId = new mongoose.Types.ObjectId();
const mentorOne = {
  isValidated: true,
  isAvailable: true,
  learners: [learnerThreeId, learnerFourId],
  _id: mentorOneId,
  name: 'Gustavo',
  lastname: 'Rodrigues',
  gender: 'Female',
  email: 'gustavo@gmail.com',
  password: 'Gustavo2@',
  userType: 'Mentor',
  tokens: [
    {
      accessToken: jwt.sign({ id: mentorOneId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign(
    { id: 'gustavo@gmail.com' },
    userAuth.secretResetPassword,
  ),
};

const mentorTwoId = new mongoose.Types.ObjectId();
const mentorTwo = {
  isValidated: true,
  isAvailable: true,
  attempts: 2,
  _id: mentorTwoId,
  learners: [learnerFiveId],
  name: 'Ana',
  lastname: 'Duarte',
  gender: 'Female',
  email: 'ana@gmail.com',
  password: 'Anaduarte2@',
  userType: 'Mentor',
  tokens: [
    {
      accessToken: jwt.sign({ id: mentorTwoId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign({ id: 'ana@gmail.com' }, userAuth.secretResetPassword),
};

const mentorThreeId = new mongoose.Types.ObjectId();
const mentorThree = {
  isValidated: false,
  isAvailable: false,
  learners: [],
  _id: mentorThreeId,
  name: 'Tiago',
  lastname: 'Reis',
  gender: 'Female',
  email: 'tiago@gmail.com',
  password: 'Tiago12@',
  userType: 'Mentor',
  tokens: [
    {
      accessToken: jwt.sign({ id: mentorThreeId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign({ id: 'tiago@gmail.com' }, userAuth.secretResetPassword),
};

const mentorFourId = new mongoose.Types.ObjectId();
const mentorFour = {
  isValidated: false,
  isAvailable: false,
  _id: mentorFourId,
  name: 'Teste',
  lastname: 'Teste',
  gender: 'Female',
  email: 'teste@gmail.com',
  password: 'Tiago12@',
  userType: 'Mentor',
  tokens: [
    {
      accessToken: jwt.sign({ id: mentorFourId }, userAuth.secret),
    },
  ],
  resetLink: jwt.sign({ id: 'teste@gmail.com' }, userAuth.secretResetPassword),
};

module.exports = {
  mentorOne,
  mentorTwo,
  mentorThree,
  mentorFour,
};
