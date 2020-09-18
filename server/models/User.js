const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  password: {
      type: String,
      required: true,
      select: false,
  },
  personType: {
      type: String,
      required: true
  },
  isAdmin: {
      type: Boolean
  },
  noAssociations: {
      type: [String],
      select: false
  },
  Certificates: {
      type: [String],
      select: false
  },
  Posts: {
      type: [String],
      select: false
  },
  Answers: {
      type: [String],
      select: false
  }
});

module.exports = mongoose.model('User', UserSchema);