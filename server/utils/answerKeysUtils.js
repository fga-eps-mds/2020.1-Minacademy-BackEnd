const { EXAM } = require('./questionTypes');

module.exports = {
  isCorrect(question, alternative) {
    return question.type === EXAM ? 'hidden' : question.answer === alternative;
  },
  /* eslint no-shadow: ["error", { "allow": ["user"] }] */
  /* eslint-env es6 */
  async populateAnswerKeys(user) {
    const answerKeys = await user.execPopulate('answers').then((user) => {
      if (!user.answers) throw new Error('User does not have any answered question');
      return user.answers.populate({
        path: 'answers',
        populate: {
          path: 'question',
          model: 'Question',
          populate: {
            path: 'module',
            model: 'Module',
          },
        },
      }).execPopulate();
    });

    return answerKeys;
  },
};
