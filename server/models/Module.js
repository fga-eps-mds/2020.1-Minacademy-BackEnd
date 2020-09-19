const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: String,
})

module.exports = mongoose.model('Module', ModuleSchema);;