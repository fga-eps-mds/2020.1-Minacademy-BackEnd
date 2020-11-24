const mongoose = require('mongoose');

const { Schema } = mongoose;

const ModuleSchema = new Schema({
  title: String,
  moduleNumber: {
    type: Number,
  },
});

ModuleSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'module',
});

module.exports = mongoose.model('Module', ModuleSchema);
