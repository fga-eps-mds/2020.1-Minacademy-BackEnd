const mongoose = require('mongoose');

const questionResultSchema = new mongoose.Schema({
   alternative: {
      type: String,
      required: true
   },
   isCorrect: {
      type: Boolean,
      required: true
   },
   question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question'
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   }
});

module.exports = mongoose.model('QuestionResult', questionResultSchema);