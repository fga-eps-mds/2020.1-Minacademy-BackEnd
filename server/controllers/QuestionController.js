const Module = require('../models/Module')
const Question = require('../models/Question')

// GET /questions?module=1
module.exports = {
   async getQuestions(req, res) {
      const query = req.query
      try {
         const module = await Module.findOne(query)
         if (!module) res.send([])
         await module.populate('questions').execPopulate()
         res.send(module.questions)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   }
}