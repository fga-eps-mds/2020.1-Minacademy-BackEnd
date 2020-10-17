const Learner = require('../models/Learner');

module.exports = {
  async getLearners(req, res) {
    const { user } = req;

    try {
      await user.execPopulate('learners');
      res.send(user.learners);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async assignLearner(req, res) {
    const { user } = req;
    user.isAvailable = true;
    try {
      const learner = (
        await Learner.find({ mentor_request: true }).sort({ createdAt: 'asc' })
      )[0];
      if (!learner) throw new Error("There's no available learners");
      learner.mentor = user._id;
      learner.mentor_request = false;
      user.learners = user.learners.concat(learner._id);
      user.isAvailable = false;
      await user.save();
      await learner.save();
      await user.execPopulate('learners');
      res.send({
        learner: user.learners[user.learners.length - 1],
        isAvailable: user.isAvailable,
      });
    } catch (error) {
      console.log(error.message); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
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
      await user.save();
      await user.execPopulate('learners');
      res.send(user.learners);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message });
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
};
