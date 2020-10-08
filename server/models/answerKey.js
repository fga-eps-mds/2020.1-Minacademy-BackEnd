const mongoose = require('mongoose');

const answerKeysSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   answers: [{
      question: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Question'
      },
      alternative: {
         type: String,
         required: true
      },
      isCorrect: {
         type: Boolean,
         required: true
      }
   }],
})

module.exports = mongoose.model('AnswerKeys', answerKeysSchema);