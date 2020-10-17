const User = require('./User');
const mongoose = require('mongoose');
const Learner = require('./Learner')
const { Schema } = mongoose;

const MentorSchema = new Schema({
    isValidated: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    learners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner"
    }],
});

MentorSchema.path('learners').validate(async function (value, respond) {
    if (this.learners.length === 0) return true
    const exists = await Learner.exists({_id: value[value.length -1]})
    return exists
}, 'Learner does not exists');

const Mentor = User.discriminator('Mentor', MentorSchema)
module.exports = Mentor