const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const userAuth = require('../config/userAuth');

module.exports = {

  async getMentor(req, res) {
    const mentor = await Mentor.findById(req.user.mentor);
    console.log(mentor);
    return res.json(mentor);
  },

  async mentorRequest(req, res) {
    try {
      const avaliableMentors = await Mentor.find({ isAvailable: true });

      if (req.user.mentor != null) {
        throw new Error('You already have a mentor');
      }

      if (avaliableMentors.length == 0) {
        throw new Error('there are no monitors available at the moment');
      }

      function min(arr) {
        arr[0].execPopulate('learners');
        let min = arr[0].learners.length;
        let minObject = arr[0];

        for (let i = 1; i < arr.length; i++) {
          arr[i].execPopulate('learners');
          if (arr[i].learners.length < min) {
            //console.log("entrou no if")
            min = arr[i].learners.length;
            minObject = arr[i];
          }
        }
        return minObject;
      }

      const chosen_mentor = min(avaliableMentors);

      req.user.mentor = chosen_mentor._id;
      req.user.mentor_request = true
      await req.user.save();

      chosen_mentor.learners = [...chosen_mentor.learners, req.user._id];

      console.log(chosen_mentor.learners);
      await chosen_mentor.save();
      const mentor = await Mentor.findById(chosen_mentor);
      console.log(mentor);

      return res.status(200).send(mentor);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  },
};
