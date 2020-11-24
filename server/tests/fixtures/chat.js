const mongoose = require('mongoose');
const { learnerOne, learnerThree } = require('./learner');
const { mentorOne } = require('./mentor')

const chatOneId = new mongoose.Types.ObjectId();
const chatOne = {
  _id : chatOneId,
  users: [learnerOne._id, mentorOne._id],
  messages: []
};

const chatTwoId = new mongoose.Types.ObjectId();
const chatTwo = {
  _id : chatTwoId,
  users: [learnerThree._id, mentorOne._id],
  messages: []
};

module.exports = {
  chatOneId,
  chatOne,
  chatTwo
};