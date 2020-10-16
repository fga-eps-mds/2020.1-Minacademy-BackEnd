const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');


module.exports = {
    async getLearners(req, res) {
        const user = req.user

        try {
            await user.execPopulate('learners')
            res.send(user.learners)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    },

    async assignLearner(req, res) {
        const user = req.user
        user.isAvailable = true
        try {
            const learner = (await Learner.find({ mentor_request: true }).sort({createdAt: 'asc'}))[0]
            if (!learner) throw new Error("There's no available learners")
            user.learners = user.learners.concat(learner._id)
            user.isAvailable = false
            learner.mentor_request = false
            await user.execPopulate('learners')
            await user.save()
            await learner.save()
            res.send({ learner: user.learners[user.learners.length - 1], isAvailable: user.isAvailable })
        } catch (error) {
            console.log(error.message)
            res.status(400).send({ error: error.message})
        }
    },

    async unassignLearner(req, res) {
        const user = req.user
        const { learnerID } = req.query
        try {
            if (!learnerID) throw new Error("Invalid learner ID")
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
            res.send(user.isAvailable)
        } catch (error) {
            console.log(error)
            res.status(400).send({ error: error.message})
        }
    }

}
