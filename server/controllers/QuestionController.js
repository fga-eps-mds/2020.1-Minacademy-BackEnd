const Module = require('../models/Module');
const Question = require('../models/Question');

module.exports = {
  async getQuestions(req, res) {
    const { query } = req;
    let questions = [];

    try {
      if (query.moduleNumber) {
        const module = await Module.findOne(query);
        if (!module) throw new Error('Modulo não encontrado');
        await module.populate('questions').execPopulate();
        questions = module.questions;
      } else if (query.exam) {
        questions = await Question.find({ module: undefined });
      }

      res.send(questions);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
    }
  },
};
