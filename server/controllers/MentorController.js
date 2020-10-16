const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');


module.exports = {
    async getMentors(req, res) {
        const mentor = await Mentor.find();
        return res.json(mentor);
    },

    async assignLearner(req, res) {
        const user = req.user
        user.isAvailable = true
        try{
            // TODO: find(somente aprendizes disponiveis)
            const learner = (await Learner.find().sort({createdAt: 'asc'}))[0]
            if (!learner) throw new Error("There's no available learners")
            user.learners = [...user.learners, learner._id]
            await user.execPopulate('learners')
            await user.save()
            res.send(user.learners)
        } catch (error) {
            console.log(error.message)
            res.status(400).send({ error: error.message})
        }
    },

    async unassignLearner(req, res) {
        const user = req.user
        const { learnerID } = req.query
        try {
            await user.execPopulate('learners')
            user.learners = user.learners.filter(learner => learner._id.toString() !== learnerID)
            await user.save()
            res.send(user.learners)
        } catch (error) {
            console.log(error)
            res.status(400).send({ error: error.message})
        }
    },

    async changeAvailability(req, res) {
        const user = req.user
        try {
            user.isAvailable = !user.isAvailable
            await user.save()
            res.send(user)
        } catch (error) {
            console.log(error)
            res.status(400).send({ error: error.message})
        }
    }

}
