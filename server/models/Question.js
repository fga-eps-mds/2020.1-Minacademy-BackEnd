const mongoose = require('mongoose');

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
    // required: true,
    ref: 'Module',
  },
});

questionSchema.methods.toJSON = function () {
  const question = this;
  const questionObject = question.toObject();

  delete questionObject.answer;

  return questionObject;
};

module.exports = mongoose.model('Question', questionSchema);
