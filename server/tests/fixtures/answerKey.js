const mongoose = require('mongoose');
const {userTwo} = require('./db');

const answerKeyOneId = new mongoose.Types.ObjectId();

const answerKeyOne={
  _id: answerKeyOneId,
  user: userTwo._id,
  answers: [
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000067'),
      alternative: 'a',
      isCorrect: false,
    },
  ],
}

module.exports = {
  answerKeyOne,
  answerKeyOneId
};