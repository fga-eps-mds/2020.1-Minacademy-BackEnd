const mongoose = require('mongoose');
const {userOne, userTwo} = require('./db');
const {mentorOne, mentorTwo} = require ('./mentor');
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
const answerKeyThreeId = new mongoose.Types.ObjectId();
const answerKeyThree={
  _id: answerKeyThreeId,
  user: mentorOne._id,
  answers: [
    { // 01
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000014'),
      alternative: 'a',
      isCorrect: true,
    },
    { // 02
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000015'),
      alternative: 'c',
      isCorrect: true,
    },
    { // 03
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000016'),
      alternative: 'a',
      isCorrect: true,
    },
    { // 04
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000017'),
      alternative: 'd',
      isCorrect: true,
    },
    { // 05
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000018'),
      alternative: 'b',
      isCorrect: true,
    },
    { // 06
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000019'),
      alternative: 'e',
      isCorrect: true,
    },
    { // 07
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001a'),
      alternative: 'd',
      isCorrect: true,
    },
    { // 08
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001b'),
      alternative: 'b',
      isCorrect: true,
    },
    { //09
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001c'),
      alternative: 'e',
      isCorrect: true,
    },
    { //10
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001d'),
      alternative: 'd',
      isCorrect: true,
    },
  ]
};
const answerKeyFourId = new mongoose.Types.ObjectId();
const answerKeyFour={
  _id: answerKeyFourId,
  user: mentorTwo._id,
  answers: [
    { // 01
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000014'),
      alternative: 'a',
      isCorrect: true,
    },
    { // 02
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000015'),
      alternative: 'c',
      isCorrect: true,
    },
    { // 03
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000016'),
      alternative: 'a',
      isCorrect: true,
    },
    { // 04
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000017'),
      alternative: 'd',
      isCorrect: true,
    },
    { // 05
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000018'),
      alternative: 'b',
      isCorrect: true,
    },
    { // 06
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d000019'),
      alternative: 'e',
      isCorrect: true,
    },
    { // 07
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001a'),
      alternative: 'c',
      isCorrect: false,
    },
    { // 08
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001b'),
      alternative: 'c',
      isCorrect: false,
    },
    { //09
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001c'),
      alternative: 'c',
      isCorrect: false,
    },
    { //10
      question: mongoose.Types.ObjectId('5f961e56fc13ae454d00001d'),
      alternative: 'c',
      isCorrect: false,
    },
  ]
};
module.exports = {
  answerKeyOne,
  answerKeyOneId,
  answerKeyTwo,
  answerKeyThree,
  answerKeyFour,
};