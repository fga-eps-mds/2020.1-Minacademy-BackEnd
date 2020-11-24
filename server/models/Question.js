const mongoose = require('mongoose');
const { TUTORIAL } = require('../utils/questionTypes');

const questionSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  alternatives: {
    alternative: {
      type: String,
    },
  },
  answer: {
    type: String,
    required: true,
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  },
  type: {
    type: String,
    required: true,
    default: TUTORIAL,
  },
});

questionSchema.methods.toJSON = function () {
  const question = this;
  const questionObject = question.toObject();

  delete questionObject.answer;

  return questionObject;
};

module.exports = mongoose.model('Question', questionSchema);
