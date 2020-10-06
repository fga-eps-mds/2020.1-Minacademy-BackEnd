const Module = require('../models/Module')

module.exports = {
   async getModules(req, res) {
      try {
         const modules = await Module.find({})

         const parsedModules = await Promise.all(modules.map(async module => {
            await module.populate('questions').execPopulate();
            const match = {}
            match.question = { $in: module.questions };

            const questionResults = await req.user.execPopulate({
               path: 'questionResults',
               match
            }).then(user => user.questionResults);

            const obj = module.toObject()
            obj.completed = questionResults.length === module.questions.length ? questionResults.every(result => result.isCorrect === true) : false
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