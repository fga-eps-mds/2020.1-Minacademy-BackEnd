const User = require('./User');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MentorSchema = User.discriminator('Mentor', new Schema({
    isValidated: {
        type: Boolean
    },
    Learners: {
        type: []
    }
}));

module.exports = mongoose.model('Mentor');
