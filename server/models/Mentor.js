const User = require('./User');
const mongoose = require('mongoose');
const Learner = require('./Learner')
const { Schema } = mongoose;

const MentorSchema = new Schema({
    isValidated: {
        type: Boolean,
        default: true
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
    console.log("VALOR: ", value[value.length -1])
    if (this.learners.length === 0) return true
    const exists = await Learner.exists({_id: value[value.length -1]})
    console.log("EXISSysadyda:", exists)
    return exists
}, 'Learner does not exists');

const Mentor = User.discriminator('Mentor', MentorSchema)
module.exports = Mentor