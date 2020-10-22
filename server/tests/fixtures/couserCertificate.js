const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userAuth = require('../../config/userAuth.json');
const {learnerOne} = require('./learner');

const certificateLearnerOneId = new mongoose.Types.ObjectId();
const certificateLearnerOne = {
  _id : certificateLearnerOneId,
  user: learnerOne._id,
  courseType: learnerOne.userType,
  key: jwt.sign({ _id: certificateLearnerOneId }, userAuth.secret),
  workload: 6,

};

module.exports = {
  certificateLearnerOne
};