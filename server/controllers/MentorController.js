const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const userAuth = require('../config/userAuth');

module.exports = {
    async getMentors(req, res) {
        const Mentor = await Mentor.find();
        return res.json(Mentor);
    },

                
    async changeToLearner(req, res) {
        const { user } = req;
        try {
            if(user.gender == "Female"){
                delete user.isValidated;
                delete user.Learners;
                user.userType = "Learner";
                User.findOneByIDAndDelete(user._id);
                const newuser = User.create(user);
                res.send({newuser});
            }
            else
                res.status(400).send({err:"Homens não podem se tornar aprendiz"});
        } catch (err) {
            res.status(400).send({err: err.message});
        }
    }
}
