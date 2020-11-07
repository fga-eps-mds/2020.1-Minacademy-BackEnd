const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  },
}, { timestamps: true });

module.exports = {
  messageSchema,
  Message: mongoose.model('Message', messageSchema),
};
