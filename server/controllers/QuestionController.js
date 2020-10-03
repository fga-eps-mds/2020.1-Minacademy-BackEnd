const Module = require('../models/Module')
const Question = require('../models/Question')
const QuestionResult = require('../models/questionResult')
const mongoose = require('mongoose');
const User = require('../models/User');

// GET /questions?module=1
module.exports = {
   async getQuestions(req, res) {
      const query = req.query
      try {
         const module = await Module.findOne(query)
         if (!module) throw new Error('Modulo não encontrado')
         await module.populate('questions').execPopulate()
         res.send(module.questions)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   },

   async answerQuestion(req, res) {
      const question = await Question.findById(req.body.question)

      try {
         if (!question) throw new Error('Questão nao encontrada')
         const isCorrect = question.answer === req.body.alternative

         const previousQuestionResult = await req.user.execPopulate({
            path: 'questionResults',
            match: {
               question: mongoose.Types.ObjectId(req.body.question)
            }
         }).then(user => user.questionResults.length === 1 ? user.questionResults[0] : null)

         if (previousQuestionResult) {
            previousQuestionResult.alternative = req.body.alternative
            previousQuestionResult.isCorrect = isCorrect
            await previousQuestionResult.save()
            res.send(previousQuestionResult)
         } else {
            const questionResult = await new QuestionResult({
               ...req.body,
               isCorrect,
               user: req.user._id,
            })
            await questionResult.save()
            res.status(201).send(questionResult)
         }
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   },

   async getQuestionsResults(req, res) {
      const match = {}
      if (req.query.questions)
         match.question = { $in: req.query.questions }

      try {
         await req.user.execPopulate({
            path: 'questionResults',
            match
         })
         res.send(req.user.questionResults)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message })
      }
   }
}