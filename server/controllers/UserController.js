
const { findOne } = require('../models/User');
const User = require('../models/User');

module.exports = {
    async getUsers(req, res, next){
        const users = await User.find();

        return res.json(users);
    },

    async createUser(req, res, next){
        try{
            const {email, username} = req.body;
            if(await User.findOne({email}))
                return res.status(400).send({error: 'Email already used'});
            
            if(await User.findOne({username}))
                return res.status(400).send({error: 'Username already used'});
            
            const class_body = await User.create(req.body);
            class_body.password = undefined;
            return res.json(class_body);
        }catch(err){
            return res.status(400).send({error: 'Register Failed'});
        }
    },

    async removeUser(req, res, next){
        try{
            const {email} = req.body;
            const class_body = await User.findOneAndDelete({email});
            return res.json(class_body);
        }catch(err){
            return res.status(400).send({error: 'Remove Failed'});
        }
    }
};
