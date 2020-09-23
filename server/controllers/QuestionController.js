const Question = require('../models/Question')
const Modulo = require('../models/Module')
const mongoose = require('mongoose')

// GET /questions?module=1
module.exports = {
   async getQuestions(req, res) {
      console.log(req.query)
      const query = req.query
      try {
         const questionsList = await Question.find({})
         res.send(questionsList)
      } catch (error) {
         console.log(error)
         res.status(400).send({ error: error.message})
      }
   }
}