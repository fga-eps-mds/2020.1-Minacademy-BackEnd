const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: String,
  moduleNumber: {
    type: Number
  }
})

ModuleSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'module'
})

module.exports = mongoose.model('Module', ModuleSchema);