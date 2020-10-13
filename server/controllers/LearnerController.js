const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Learner = require('../models/Learner');
const userAuth = require('../config/userAuth');

module.exports = {
    async getLearners(req, res) {
        const learner = await Learner.find();
        return res.json(learner);
    }
}
