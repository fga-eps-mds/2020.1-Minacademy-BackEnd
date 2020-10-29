const mongoose = require('mongoose');
const {userOne, userTwo} = require('./db');

const answerKeyOneId = new mongoose.Types.ObjectId();

const answerKeyOne={
  _id: answerKeyOneId,
  user: userOne._id,
  answers: [
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000067'),
      alternative: 'a',
      isCorrect: false,
    },
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000064'),
      alternative: 'b',
      isCorrect: true,
    },
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000065'),
      alternative: 'c',
      isCorrect: true,
    },
  ],
  
};

const answerKeyTwoId = new mongoose.Types.ObjectId();
const answerKeyTwo={
  _id: answerKeyTwoId,
  user: userTwo._id,
  answers: [
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000067'),
      alternative: 'a',
      isCorrect: false,
    },
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000064'),
      alternative: 'b',
      isCorrect: true,
    },
    {
      question: mongoose.Types.ObjectId('5f6cfbb6fc13ae3bc6000065'),
      alternative: 'c',
      isCorrect: true,
    },
  ],
}

module.exports = {
  answerKeyOne,
  answerKeyOneId,
  answerKeyTwo,

};