const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userAuth = require('../../config/userAuth.json');


const learnerOneId = new mongoose.Types.ObjectId();
const learnerOne = {
    mentor: null,
    _id: learnerOneId,
    name: 'Renata',
    lastname: 'Santos',
    gender: 'Female',
    email: 'renata@gmail.com',
    password: 'Renata2@',
    userType: 'Learner',
    tokens: [{
        accessToken: jwt.sign({ id: 'renata@gmail.com' }, userAuth.secret)
    }],
    resetLink: jwt.sign({ id: 'renata@gmail.com'}, userAuth.secretResetPassword)
}

const learnerTwoId = new mongoose.Types.ObjectId();
const learnerTwo = {
    mentor: null,
    _id: learnerTwoId,
    name: 'Luisa',
    lastname: 'Sousa',
    gender: 'Female',
    email: 'luisa@gmail.com',
    password: 'Luisa2@',
    userType: 'Learner',
    tokens: [{
        accessToken: jwt.sign({ id: 'luisa@gmail.com' }, userAuth.secret)
    }],
    resetLink: jwt.sign({ id: 'luisa@gmail.com'}, userAuth.secretResetPassword)
}

const learnerThreeId = new mongoose.Types.ObjectId();
const learnerThree = {
    mentor: null,
    _id: learnerThreeId,
    name: 'Vanessa',
    lastname: 'Carvalho',
    gender: 'Female',
    email: 'vanessa@gmail.com',
    password: 'Vanessa2@',
    userType: 'Learner',
    tokens: [{
        accessToken: jwt.sign({ id: 'vanessa@gmail.com'}, userAuth.secret)
    }],
    resetLink: jwt.sign({ id: 'vanessa@gmail.com'}, userAuth.secretResetPassword)
}

const learnerFourId = new mongoose.Types.ObjectId();
const learnerFour = {
    mentor: null,
    _id: learnerFourId,
    name: 'Helen',
    lastname: 'Rodrigues',
    gender: 'Female',
    email: 'helen@gmail.com',
    password: 'Helen2@',
    userType: 'Learner',
    tokens: [{
        accessToken: jwt.sign({ id: 'helen@gmail.com' }, userAuth.secret)
    }],
    resetLink: jwt.sign({ id: 'helen@gmail.com'}, userAuth.secretResetPassword)
}

const learnerFiveId = new mongoose.Types.ObjectId();
const learnerFive = {
    mentor: null,
    _id: learnerFiveId,
    name: 'Camila',
    lastname: 'Porto',
    gender: 'Female',
    email: 'camila@gmail.com',
    password: 'Camila2@',
    userType: 'Learner',
    tokens: [{
        accessToken: jwt.sign({ id: 'camila@gmail.com' }, userAuth.secret)
    }],
    resetLink: jwt.sign({ id: 'camila@gmail.com'}, userAuth.secretResetPassword)
}


module.exports = {
    learnerOne,
    learnerTwo,
    learnerThree,
    learnerFour,
    learnerFive,
    learnerThreeId,
    learnerFourId,
    learnerFiveId,
  };