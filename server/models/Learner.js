const User = require('./User');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const LearnerSchema = new Schema({
    completedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
    }],
    mentor_request: {
        type: Boolean,
        default: false
    },
    mentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
        default: null
    },

});

const Learner = User.discriminator('Learner', LearnerSchema)
module.exports = Learner


