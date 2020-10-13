const User = require('./User');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const LearnerSchema = new Schema({
    completedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
});

const Learner = User.discriminator('Learner', LearnerSchema)
module.exports = Learner


