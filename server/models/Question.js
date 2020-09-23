const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
   number: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   alternatives: {
      alternative: {
         type: String,
         required: true
      }
   },
   module: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Module'
   }
});

module.exports = mongoose.model('Question', questionSchema);