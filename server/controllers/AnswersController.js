const Module = require('../models/Module')
const Question = require('../models/Question')
const AnswerKeys = require('../models/AnswerKey')
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
   async answerQuestion(req, res) {
      const question = await Question.findById(req.body.question)
      // if(!question) throw new Error("Question not found")
      try {
         const answer = {
            question: req.body.question,
            alternative: req.body.alternative,
            isCorrect: question.answer === req.body.alternative,
         }
         let answerKeys = await req.user.execPopulate('answers').then(user => user.answers)
         if (answerKeys) {
            answerKeys.answers = answerKeys.answers.filter(answer => answer.question.toString() != question._id)
            answerKeys.answers = answerKeys.answers.concat(answer)
         } else {
            answerKeys = await new AnswerKeys({
               user: req.user._id,
               answers: answer
            })
         }

         await answerKeys.save()
         res.send(answer)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   },

}