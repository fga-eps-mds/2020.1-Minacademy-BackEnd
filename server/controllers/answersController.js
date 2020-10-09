const Module = require('../models/Module')
const Question = require('../models/Question')
const AnswerKeys = require('../models/answerKey')
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



   // async getProgress(req, res) {
   //    let queryAnswers = []

   //    try {
   //       const answerKeys = await req.user.execPopulate('answers').then(user => user.answers)
   //       if (!answerKeys) throw new Error('User does not have any answered question')
   //       answerKeys.answers.forEach(async answer => {
   //          const question = await Question.findById(answer.question)
   //          answer.isCorrect = question.answer == answer.alternative.toString()
   //          console.log("RESPOSTA: ", answer.isCorrect)
   //       })
   //       await answerKeys.save()

   //       const correctAnswers = answerKeys.answers.filter(answer => answer.isCorrect)

   //       if (req.query.moduleNumber) {
   //          const module = await Module.findOne({ moduleNumber: req.query.moduleNumber })
   //          let questions = await module.execPopulate('questions').then(module => module.questions)
   //          questions = questions.map(question => question._id.toString())
   //          queryAnswers = answerKeys.answers.filter(answer => {
   //             return questions.includes(JSON.parse(JSON.stringify(answer.question)))
   //          })
   //       }

   //       const totalQuestions = await Question.find({})
   //       const totalProgress = Math.floor((correctAnswers.length / totalQuestions.length) * 100)

   //       const payload = req.query.moduleNumber ? { correctAnswers: correctAnswers.length, totalProgress, queryAnswers } : { totalProgress, correctAnswers: correctAnswers.length }
   //       res.send(payload)
   //    } catch (error) {
   //       res.status(400).send({ error: error.message })
   //    }
   // }
}