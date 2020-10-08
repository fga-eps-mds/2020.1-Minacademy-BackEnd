const Module = require('../models/Module')

module.exports = {
   async getModules(req, res) {
      try {
         const modules = await Module.find({})

         const parsedModules = await Promise.all(modules.map(async module => {
            await module.populate('questions').execPopulate();
            const match = {}
            match.question = { $in: module.questions };

            const answerKeys = await req.user.execPopulate('answers').then(user => user.answers)
            const obj = module.toObject()
            const questions = module.questions.map(question => JSON.parse(JSON.stringify(question._id)))
            if (answerKeys) {
               const filteredAnswers = answerKeys.answers.filter(answer => questions.includes(JSON.parse(JSON.stringify(answer.question))))
               obj.completed = filteredAnswers.length ===  module.questions.length ? filteredAnswers.every(result => result.isCorrect === true) : false
            } else {
               obj.completed = false
            }

            if (obj.completed) {
               req.user.completedModules.includes(module._id) ? null : req.user.completedModules = req.user.completedModules.concat(module._id);
            };
            return obj
         }))

         await req.user.save();
         res.send(parsedModules)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   }
}