const Module = require('../models/Module')

module.exports = {
   async getModules(req, res) {
      try {
         const modules = await Module.find({})
         res.send(modules)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   }
}