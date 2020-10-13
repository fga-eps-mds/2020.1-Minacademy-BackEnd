const User = require('./User');
const mongoose = require('mongoose');
const Learner = require('./Learner')
const { Schema } = mongoose;

const MentorSchema = new Schema({
    isValidated: {
        type: Boolean,
        default: false
    },
    Learners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Learner"
    }]
});

const Mentor = User.discriminator('Mentor', MentorSchema)
module.exports = Mentor