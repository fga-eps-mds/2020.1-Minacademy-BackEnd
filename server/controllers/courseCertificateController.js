const jwt = require('jsonwebtoken');
const CourseCertificate = require('../models/CourseCertificate');
const userAuth = require('../config/userAuth');
const User = require('../models/User');

module.exports = {

  async generateCertificate(req, res) {
    const { user } = req;
    const hasLearnerCertificate = await CourseCertificate.find({
      user: user._id,
      courseType: 'Learner',
    });
    try {
      const certificateData = {
        user: user._id,
        courseType: user.userType,
        key: jwt.sign({ _id: user._id }, userAuth.secret),
      };
     
      // console.log(hasLearnerCertificate);
      if (hasLearnerCertificate.length === 0) {
        const certificate = await CourseCertificate.create(certificateData);
        if (user.userType === 'Learner') {
          user.courseCertificates.push(certificate._id);
        }
        await certificate.save();
        await user.save();

        res.status(200).send( certificate );
      } else {
        throw new Error('you already have a learner certificate');
      }
    } catch (error) {
      return res
        .status(400)
        .send({
          error: error.message,
          learnerCertificate: hasLearnerCertificate[0]
        });
    }
  },

  async getLearnerCertificate(req, res) {
    const { _id } = req.body;

    try {
      const certificate = await CourseCertificate.findById(_id);
      const user = await User.findById(certificate.user);
      certificate.user = user;
      return res.status(200).send({ certificate });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
