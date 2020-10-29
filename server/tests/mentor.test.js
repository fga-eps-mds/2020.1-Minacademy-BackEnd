const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const AnswerKey = require('../models/AnswerKey');
const Question = require('../models/Question');
const {
  learnerOne,
  learnerTwo,
  learnerThree,
  learnerFour,
  learnerFive,
} = require('./fixtures/learner');
const {
  mentorOne,
  mentorTwo,
  mentorThree,
  mentorFour,
} = require('./fixtures/mentor');
const { answerKeyThree } = require('./fixtures/answerKey')
const { questions } = require('./fixtures/examQuestions')

const request = supertest(app);

describe('Mentor', () => {
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
    await new AnswerKey(answerKeyThree).save();
    await Question.insertMany(questions);
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should get all learners for mentor one', async () => {
    const response = await request
      .get('/api/mentors')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.length).toBe(2);
  });

  it('Should assign a learner to mentor one', async () => {
    const response = await request
      .patch('/api/mentors')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.learner).not.toBeNull();
  });

  it('Should not assign a learner to mentor one', async () => {
    const response = await request
      .patch('/api/mentors')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual("There's no available learners");
  });

  it('Should unassign a learner to mentor one', async () => {
    const response = await request
      .delete(`/api/mentors?learnerID=${learnerOne._id}`)
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(200);

    const removed = response.body.some((item) => item.id === learnerOne._id);
    expect(removed).toBeFalsy();
  });

  it('Should not unassign a learner to mentor one', async () => {
    const response = await request
      .delete('/api/mentors?')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('Invalid learner ID');
  });

  it('Should change availability of mentor one', async () => {
    const response = await request
      .patch('/api/mentors/availability')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body === true || response.body === false).toBeTruthy();
  });

  it('Should validate mentor one', async () => {
    const response = await request
      .patch('/api/mentors/validation')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.user.isValidated).toBe(true);
    expect(response.body.result).toBe(10)
  });
});
