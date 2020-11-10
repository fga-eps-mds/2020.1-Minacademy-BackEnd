const Learner = require('../models/Learner');
const Question = require('../models/Question');
const { populateAnswerKeys } = require('../utils/answerKeysUtils');
const { EXAM } = require('../utils/questionTypes');
const { createChat } = require('./ChatController');
const transport = require('../mail/index');
const mail = require('../mail/data');

module.exports = {
  async getLearners(req, res) {
    const { user } = req;

    try {
      await user.execPopulate('learners');
      if (user.learners.length < 1) throw new Error('Mentor does not have learners');
      res.send(user.learners);
    } catch (error) {
      res.status(400).send({ error: error.message, learners: user.learners });
    }
  },

  async assignLearner(req, res) {
    const { user } = req;
    user.isAvailable = true;
    try {
      await user.save();
      const learner = (
        await Learner.find({ mentor_request: true, mentor: null }).sort({
          createdAt: 'asc',
        })
      )[0];
      if (!learner) throw new Error("There's no available learners");
      learner.mentor = user._id;
      learner.mentor_request = false;
      user.learners = user.learners.concat(learner._id);
      user.isAvailable = false;
      await user.save();
      await learner.save();
      await user.execPopulate('learners');
      await createChat([learner._id, user._id]);
      const data = mail.assignMentor(learner.email, user.name);
      const data2 = mail.assignLearner(user.email, learner.name);
      await transport.sendMail(data);
      await transport.sendMail(data2);
      /* eslint-disable no-unused-expressions */
      res.send({
        learner: user.learners[user.learners.length - 1],
        isAvailable: user.isAvailable,
      });
    } catch (error) {
      console.log(error.message); // eslint-disable-line no-console
      res
        .status(400)
        .send({ isAvailable: user.isAvailable, error: error.message });
    }
  },

  async unassignLearner(req, res) {
    const { user } = req;
    const { learnerID } = req.query;
    try {
      if (!learnerID) throw new Error('Invalid learner ID');
      user.learners = user.learners.filter(
        (learner) => learner.toString() !== learnerID,
      );
      await Learner.findByIdAndUpdate(learnerID, {
        mentor: null,
        mentor_request: false,
      });
      const learner = await Learner.findById(learnerID);
      await user.save();
      await user.execPopulate('learners');
      const data = mail.unassignMentor(learner.email, user.name);
      const data2 = mail.unassignLearner(user.email, learner.name);
      await transport.sendMail(data);
      await transport.sendMail(data2);
      res.send(user.learners);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ learners: user.learners, error: error.message });
    }
  },

  async changeAvailability(req, res) {
    const { user } = req;
    try {
      user.isAvailable = !user.isAvailable;
      await user.save();
      res.send(user.isAvailable);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
    }
  },

  async validateMentor(req, res) {
    const { user } = req;
    try {
      const answerKeys = await populateAnswerKeys(user);

      const examResult = answerKeys.answers.filter((answer) => {
        const isCorrect = answer.alternative === answer.question.answer;
        return answer.question.type === EXAM && isCorrect;
      });

      const totalExamQuestions = await Question.countDocuments({ type: EXAM });
      if (examResult.length >= totalExamQuestions * 0.7) {
        user.isValidated = true;
      } else {
        user.answers.answers = user.answers.answers.filter(
          (key) => key.question.type !== EXAM,
        );
        user.isValidated = false;
        user.attempts -= 1;
      }
      await user.answers.save();
      await user.save();
      if (!user.isValidated) throw new Error('Mentor does not have score to validate');
      res.status(200).send({ user, result: examResult.length, attempts: user.attempts });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({
        error: error.message,
        user,
      });
    }
  },
};
