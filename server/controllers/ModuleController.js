const Module = require('../models/Module');

const checkModuleCompletion = async (module, user) => {
  const questions = await module.execPopulate('questions')
    .then((doc) => doc.questions.map((question) => question._id.toString()));

  const match = {};
  match.question = { $in: module.questions };

  const answerKeys = await user
    .execPopulate('answers')
    .then((doc) => doc.answers);

  const obj = module.toObject();

  const filteredAnswers = answerKeys.answers
    .filter((answer) => questions.includes(answer.question.toString()));

  obj.completed = (filteredAnswers.length === questions.length)
    ? (filteredAnswers.every((result) => result.isCorrect === true))
    : (false);

  /* eslint-disable no-unused-expressions */
  /* eslint-disable no-param-reassign */
  if (obj.completed) {
    user.completedModules.includes(module._id)
      ? (null)
      : (user.completedModules = user.completedModules.concat(module._id));
  }
  return obj;
};

module.exports = {
  async getModules(req, res) {
    const { user } = req;
    let parsedModules = [];

    try {
      const modules = await Module.find({});

      const answerKeys = await user.execPopulate('answers').then((doc) => doc.answers);
      if (answerKeys) {
        parsedModules = await Promise.all(
          modules.map(async (module) => {
            const obj = await checkModuleCompletion(module, user);
            return obj;
          }),
        );
      } else {
        parsedModules = modules;
      }

      await user.save();
      res.send(parsedModules);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
    }
  },
};
