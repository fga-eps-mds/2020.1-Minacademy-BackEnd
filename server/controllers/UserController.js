
const User = require('../models/User');

module.exports = {
    async getUsers(req, res, next){
        const users = await User.find();

        return res.json(users);
    },

    async createUser(req, res, next){
        const class_body = await User.create(req.body);

        return res.json(class_body);
    },


};
