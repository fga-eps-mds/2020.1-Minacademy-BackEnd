const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const userAuth = require('../config/userAuth');

module.exports = {
    async getMentors(req, res) {
        const mentor = await Mentor.find();
        return res.json(mentor);
    }
}
