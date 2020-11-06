const mongoose = require('mongoose');
const { learnerOne } = require('./learner');
const { mentorOne } = require('./mentor')

const chatOneId = new mongoose.Types.ObjectId();
const chatOne = {
  _id : chatOneId,
  users: [learnerOne._id, mentorOne._id],
  messages: []
};

module.exports = {
  chatOneId,
  chatOne
};