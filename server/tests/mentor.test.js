const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { learnerOne, learnerTwo, learnerThree, learnerFour, learnerFive} = require('./fixtures/learner');
const { mentorOne, mentorTwo, mentorThree, mentorFour } = require('./fixtures/mentor');

const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');

const app = require('../app');

const request = supertest(app);
const userAuth = require('../config/userAuth');

describe('Learner', () => {
    beforeAll(async () => {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      await new Learner(learnerOne).save();
      await new Learner(learnerTwo).save();
      await new Learner(learnerThree).save();
      await new Learner(learnerFour).save();
      await new Learner(learnerFive).save();
      await new Mentor(mentorOne).save();
      await new Mentor(mentorTwo).save();
      await new Mentor(mentorThree).save();
      await new Mentor(mentorFour).save();
    });

    afterAll(async (done) => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      done();
    });

    it('Should get all learners for mentor one', async () => {
      const response = await request.get('/mentors')
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(200)

        expect(response.body.length).toBe(2)
    })

    it('Should assign a learner to mentor one', async () => {
      const response = await request.patch('/mentors')
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(200)

        console.log("APRENDIZ!!!: ", response.body)
        expect(response.body.learner).not.toBeNull()
    })

    it('Should not assign a learner to mentor one', async () => {
      const response = await request.patch('/mentors')
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(400)
    })

    it('Should unassign a learner to mentor one', async () => {
      const response = await request.delete(`/mentors?learnerID=${learnerOne._id}`)
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(200)

      const removed = response.body.some(item => item.id === learnerOne._id)
      expect(removed).toBeFalsy()
    })

    it('Should not unassign a learner to mentor one', async () => {
      const response = await request.delete('/mentors?')
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(400)
    })

    it('Should change availability of mentor one', async () => {
      const response = await request.patch('/mentors/availability')
        .send()
        .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
        .expect(200)

        expect(response.body).toBeTruthy()
    })

});