const Module = require('../models/Module')
const Question = require('../models/Question')
const mongoose = require('mongoose');
const User = require('../models/User');

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
   }
}