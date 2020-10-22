const mongoose = require('mongoose');
const AnswerKey = require('./AnswerKey');
const Mentor = require('./Mentor');
const User = require('./User');

const { Schema } = mongoose;

const LearnerSchema = new Schema({
  completedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  }],
  mentor_request: {
    type: Boolean,
    default: false,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null,
  },
});

LearnerSchema.pre('remove', async function (next) {
  const learner = this;
  if (learner.mentor) {
    await Mentor.findByIdAndUpdate(learner.mentor, { $pull: { learners: learner._id } });
  }
  await AnswerKey.deleteMany({ user: learner._id });
  next();
});

const Learner = User.discriminator('Learner', LearnerSchema);
module.exports = Learner;
