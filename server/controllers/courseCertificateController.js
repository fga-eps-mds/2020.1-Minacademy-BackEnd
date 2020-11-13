const jwt = require('jsonwebtoken');
const CourseCertificate = require('../models/CourseCertificate');
const userAuth = require('../config/userAuth');
const transport = require('../mail');
const mail = require('../mail/data');

module.exports = {
  async generateCertificate(req, res) {
    const { user } = req;

    try {
      const { hasLearnerCertificate, mentor } = await user
        .populate([
          {
            path: 'courseCertificate',
            match: {
              courseType: 'Learner',
            },
          },
          {
            path: 'mentor',
          },
        ])
        .execPopulate()
        .then((doc) => ({
          hasLearnerCertificate: doc.courseCertificates,
          mentor: doc.mentor,
        }));

      if (hasLearnerCertificate.length > 0) {
        throw new Error('you already have a learner certificate');
      }

      const certificateData = {
        user: user._id,
        courseType: user.userType,
        key: jwt.sign({ _id: user._id }, userAuth.secret),
      };

      if (mentor) {
        certificateData.assignedPartner = mentor._id;
        const mentorCertificateData = {
          user: mentor._id,
          assignedPartner: user._id,
          courseType: 'Mentor',
          key: jwt.sign(
            { _id: { mentor: mentor._id, learner: user._id } },
            userAuth.secret,
          ),
        };
        const mentorCertificate = await new CourseCertificate(
          mentorCertificateData,
        );
        mentor.courseCertificates.push(mentorCertificate._id);
        await mentorCertificate.save();
        await mentor.save();
        const mentorData = mail.courseConcludedForMentor(
          mentor.email,
          mentorCertificate._id,
          mentor.name,
          `${user.name} ${user.lastname}`,
        );
        await transport.sendMail(mentorData);
      }

      const certificate = await new CourseCertificate(certificateData);
      user.courseCertificates.push(certificate._id);
      const data = mail.courseConcluded(user.email, certificate._id, user.name);
      await transport.sendMail(data);
      await certificate.save();
      await user.save();

      res.send(certificate);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      return res.status(400).send({
        error: error.message,
        certificate: user.courseCertificates[0],
      });
    }
  },

  async getCertificateById(req, res) {
    const { _id } = req.params;

    try {
      const certificate = await CourseCertificate.findById(_id);
      if (!certificate) throw new Error('Certificate does not exists');
      await certificate.execPopulate(['user', 'assignedPartner']);
      return res.send(certificate);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  async getAllCertificates(req, res) {
    const { user } = req;
    try {
      const certificates = await CourseCertificate.find({ user: user._id });
      if (!certificates.length) {
        throw new Error('This user does not have certificates');
      }
      await CourseCertificate.populate(certificates, [
        'user',
        'assignedPartner',
      ]);
      return res.send(certificates);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      return res.status(400).send({ error: error.message });
    }
  },
};
