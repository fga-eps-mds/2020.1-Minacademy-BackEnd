const Module = require('../models/Module');

module.exports = {
    async getUsers(req, res, next){
        const modules = await Module.find();

        return res.json(modules);
    },
};
