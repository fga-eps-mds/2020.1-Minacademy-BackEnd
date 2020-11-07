const mongoose = require('mongoose');
const { messageSchema } = require('./Message');

const chatSchema = new mongoose.Schema({
  messages: [messageSchema],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Chat', chatSchema);
