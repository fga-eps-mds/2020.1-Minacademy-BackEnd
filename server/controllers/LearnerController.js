const Mentor = require('../models/Mentor');
const User = require('../models/User');
const { createChat } = require('./ChatController');
const transport = require('../mail/index');
const mail = require('../mail/data');

module.exports = {
  async getMentor(req, res) {
    const learner = req.user;
    try {
      const mentor = await Mentor.findById(learner.mentor);
      if (!mentor) throw new Error('Learner does not have a mentor');
      return res.send(mentor);
    } catch (error) {
      return res.status(400).send({ error: error.message, mentor: learner.mentor });
    }
  },

  async assignMentor(req, res) {
    const learner = req.user;

    try {
      learner.mentor_request = true;
      await learner.save();
      if (learner.mentor) throw new Error('Learner already has a mentor');
      let mentor = (await Mentor.aggregate()
        .match({ isAvailable: true, isValidated: true, _id: { $nin: learner.noAssociations } })
        .group({
          _id: '$_id',
          size: { $max: '$learners' },
          createdAt: { $min: '$createdAt' } // eslint-disable-line comma-dangle
        })
        .sort({ createdAt: 'asc', size: 1 }))[0];
      /* eslint-disable quotes */
      /* eslint-disable quote-props */
      if (!mentor) throw new Error('There are no available mentors');

      mentor = await Mentor.findById(mentor._id);

      learner.mentor = mentor._id;
      learner.mentor_request = false;
      mentor.learners = mentor.learners.concat(learner._id);
      mentor.isAvailable = false;

      await learner.save();
      await mentor.save();
      await createChat([learner._id, mentor._id]);

      const data = mail.assignMentor(req.user.email, req.user.name, mentor.name, mentor.gender);
      const data2 = mail.assignLearner(mentor.email, req.user.name);
      await transport.sendMail(data);
      await transport.sendMail(data2);

      return res.status(200).send({ mentorRequest: learner.mentor_request, mentor });
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return res.status(400).send({ error: err.message, mentor_request: learner.mentor_request });
    }
  },

  async cancelMentorRequest(req, res) {
    const { user } = req;
    try {
      if (!user.mentor_request) throw new Error('Learner already canceled mentor request');
      user.mentor_request = false;
      await user.save();
      res.status(200).send(user.mentor_request);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ error: error.message, mentor_request: user.mentor_request });
    }
  },

  async unassignMentor(req, res) {
    const learner = req.user;
    try {
      if (!learner.mentor) throw new Error('Learner does not have a mentor');
      await Mentor.findByIdAndUpdate(learner.mentor, {
        $pull: { learners: learner._id },
        $push: { noAssociations: learner._id },
        isAvailable: false,
      });
      const oldMentor = learner.mentor;
      const mentorMail = await Mentor.findById(learner.mentor);
      learner.noAssociations.push(learner.mentor);
      learner.mentor = null;
      await learner.save();
      const data = mail.unassignMentor(req.user.email, req.user.name, mentorMail.name, mentorMail.gender); // eslint-disable-line max-len
      const data2 = mail.unassignLearner(mentorMail.email, mentorMail.name, req.user.name);
      await transport.sendMail(data);
      await transport.sendMail(data2);
      res.send({ mentorRequest: learner.mentor_request, mentor: learner.mentor, oldMentor });
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      res.status(400).send({ mentor: learner.mentor, error: error.message });
    }
  },

  async promoteToMentor(req, res) {
    const { _id } = req.user;
    const reqUser = req.user;
    try {
      const hasLearnerCertificate = reqUser.courseCertificates.length > 0;

      if (!hasLearnerCertificate) throw new Error('User did not conclude Tutorial');
      if (reqUser.mentor) {
        await User.findOneAndUpdate({ _id }, {
          $pull: { learners: reqUser._id },
          $push: { noAssociations: reqUser._id },
          isAvailable: false,
        });
        reqUser.noAssociations.push(reqUser.mentor);
        reqUser.mentor = null;
        reqUser.save();
      }
      const user = await User.findByIdAndUpdate(
        _id,
        {
          $set: { userType: 'Mentor' },
          mentor_request: false,
        }, { new: true },
      );
      user.isValidated = true;
      user.save();
      const data = mail.learnerPromotion(user.email, user.name);
      await transport.sendMail(data);

      res.status(200).send({ user });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
};
