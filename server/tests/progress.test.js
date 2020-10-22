const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userAuth = require('../config/userAuth');
const Module = require('../models/Module');
const Question = require('../models/Question');
const AnswerKey = require('../models/AnswerKey');
const User = require('../models/User');
const { questions, modules } = require('./fixtures/tutorial');
const { userOne, userTwo, answerKey } = require('./fixtures/db');

const request = supertest(app);

describe('Questions', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await User.insertMany([userOne, userTwo]);
    await Question.insertMany(questions);
    await Module.insertMany(modules);
    await new AnswerKey(answerKey).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should get question result for userOne', async () => {
    const response = await request
      .get('/progress')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.length).not.toBeNull();
  });

  it('Should not get question result for useTwo', async () => {
    const response = await request
      .get('/progress')
      .send()
      .set('Cookie', [`auth_token=${userTwo.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('User does not have any answered question');
  });

  it('Should get question result for question 4', async () => {
    const response = await request
      .get('/progress?moduleNumber=2')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.queryAnswers.length).toBe(1);
  });

  it('Should not get question result', async () => {
    const response = await request
      .get('/progress?moduleNumber=1')
      .send()
      .set('Cookie', [
        `auth_token=$${jwt.sign({ id: 'maria@gmail.com' }, userAuth.secret)}`,
      ])
      .expect(401);

    expect(response.body.error).toEqual('Unauthorized');
  });
});
