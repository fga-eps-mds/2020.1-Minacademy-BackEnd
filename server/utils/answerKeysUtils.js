const { EXAM } = require('./questionTypes')

module.exports = {
  isCorrect(question, alternative) {
    return question.type === EXAM ? 'hidden' : question.answer === alternative
  },

  async populateAnswerKeys(user) {
    const answerKeys = await user.execPopulate('answers').then((user) =>
      user.answers.populate({
          path: 'answers',
          populate: {
            path: 'question',
            model: 'Question',
            populate: {
              path: 'module',
              model: 'Module',
            },
          },
        }).execPopulate()
    );

    return answerKeys;
  },
};
