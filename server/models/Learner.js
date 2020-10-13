const User = require('./User');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const LearnerSchema = User.discriminator('Learner', new Schema({
    completedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
}));

module.exports = mongoose.model('Learner');
