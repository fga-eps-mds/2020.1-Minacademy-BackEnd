const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid');
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate(value) {
        if (value.includes('password')) {
          throw new Error('Password must not contain "password"');
        }
      },
    },
    resetLink: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      select: false,
    },
    noAssociations: {
      type: [String],
      select: false,
    },
    courseCertificates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseCertificate',
    }],
    tokens: [
      {
        accessToken: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, discriminatorKey: 'userType' } // eslint-disable-line comma-dangle
);

UserSchema.virtual('answers', {
  ref: 'AnswerKeys',
  localField: '_id',
  foreignField: 'user',
  justOne: true,
});

UserSchema.virtual('chat', {
  ref: 'Chat',
  localField: '_id',
  foreignField: 'users',
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
