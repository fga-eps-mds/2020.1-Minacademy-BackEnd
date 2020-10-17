const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const {
  learnerOne,
  learnerTwo,
  learnerThree,
  learnerFour,
  learnerFive,
} = require('./fixtures/learner');
const { mentorOne, mentorTwo, mentorThree } = require('./fixtures/mentor');

const request = supertest(app);

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
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should be able to atribute one mentor to one learner and more one learner to one mentor', async () => {
    const response = await request
      .patch('/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
  });

  it('Should not be able to atribute one mentor to one learner', async () => {
    await Mentor.updateMany({}, { isAvailable: false });
    const response = await request
      .patch('/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerTwo.tokens[0].accessToken}`]);
    expect(response.status).toEqual(400);
  });
});
