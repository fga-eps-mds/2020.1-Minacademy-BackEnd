const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userAuth = require('../../config/userAuth.json');

const learnerOneId = new mongoose.Types.ObjectId();
const learnerOne = {
  mentor: null,
  mentor_request: true,
  _id: learnerOneId,
  name: 'Renata',
  lastname: 'Santos',
  gender: 'Female',
  email: 'renata@gmail.com',
  password: 'Renata2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerOneId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'renata@gmail.com' }, userAuth.secretResetPassword),
};

const learnerTwoId = new mongoose.Types.ObjectId();
const learnerTwo = {
  mentor: null,
  mentor_request: false,
  _id: learnerTwoId,
  name: 'Luisa',
  lastname: 'Sousa',
  gender: 'Female',
  email: 'luisa@gmail.com',
  password: 'Luisa2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerTwoId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'luisa@gmail.com' }, userAuth.secretResetPassword),
};

const learnerThreeId = new mongoose.Types.ObjectId();
const learnerThree = {
  mentor: null,
  mentor_request: false,
  _id: learnerThreeId,
  name: 'Vanessa',
  lastname: 'Carvalho',
  gender: 'Female',
  email: 'vanessa@gmail.com',
  password: 'Vanessa2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerThreeId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'vanessa@gmail.com' }, userAuth.secretResetPassword),
};

const learnerFourId = new mongoose.Types.ObjectId();
const learnerFour = {
  mentor: null,
  mentor_request: false,
  _id: learnerFourId,
  name: 'Helen',
  lastname: 'Rodrigues',
  gender: 'Female',
  email: 'helen@gmail.com',
  password: 'Helen2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerFourId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'helen@gmail.com' }, userAuth.secretResetPassword),
};

const learnerFiveId = new mongoose.Types.ObjectId();
const learnerFive = {
  mentor: null,
  mentor_request: false,
  _id: learnerFiveId,
  name: 'Camila',
  lastname: 'Porto',
  gender: 'Female',
  email: 'camila@gmail.com',
  password: 'Camila2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerFiveId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'camila@gmail.com' }, userAuth.secretResetPassword),
};

const learnerSixId = new mongoose.Types.ObjectId();
const learnerSixCertificateId = new mongoose.Types.ObjectId();
const learnerSix = {
  mentor: null,
  mentor_request: false,
  _id: learnerSixId,
  name: 'Maria',
  lastname: 'Silva',
  gender: 'Female',
  email: 'maria@gmail.com',
  password: 'Maria2@',
  userType: 'Learner',
  tokens: [{
    accessToken: jwt.sign({ id: learnerSixId }, userAuth.secret),
  }],
  resetLink: jwt.sign({ id: 'maria@gmail.com' }, userAuth.secretResetPassword),
  courseCertificates: [learnerSixCertificateId],
};

module.exports = {
  learnerOne,
  learnerTwo,
  learnerThree,
  learnerFour,
  learnerFive,
  learnerThreeId,
  learnerFourId,
  learnerFiveId,
  learnerSix,
  learnerSixId,
};
