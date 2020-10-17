const Mentor = require('../models/Mentor');

module.exports = {
  async getMentor(req, res) {
    const mentor = await Mentor.findById(req.user.mentor);
    return res.json(mentor);
  },

  async mentorRequest(req, res) {
    req.user.mentor_request = true;

    try {
      if (req.user.mentor !== null) throw new Error('You already have a mentor');

      let mentor = (await Mentor.aggregate()
        .match({ isAvailable: true })
        .group({
          _id: '$_id',
          size: { $max: '$learners' },
          createdAt: { $max: '$createdAt' } // eslint-disable-line comma-dangle
        })
        .sort({ size: 1, createdAt: 'asc' }))[0];

      mentor = await Mentor.findById(mentor._id);

      if (!mentor) throw new Error("There's no mentor available");

      req.user.mentor = mentor._id;
      mentor.learners = mentor.learners.concat(req.user._id);
      mentor.isAvailable = false;

      await req.user.save();
      await mentor.save();

      return res.status(200).send(mentor);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      return res.status(400).send({ error: err.message });
    }
  },
};
