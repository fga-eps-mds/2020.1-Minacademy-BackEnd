const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Module = require('../models/Module');
const Question = require('../models/Question');
const User = require('../models/User');
const AnswerKey = require('../models/AnswerKey');
const { modules, questions } = require('./fixtures/tutorial');
const { userOne, userTwo } = require('./fixtures/db');
const { learnerOne } = require('./fixtures/learner')
const {answerKeyOne, answerKeyTwo} = require('./fixtures/answerKey');

describe('Modules', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await Module.insertMany(modules);
    await Question.insertMany(questions);
    await new User(userOne).save();
    await new User(userTwo).save();
    await new User(learnerOne).save();
    await new AnswerKey(answerKeyOne).save();
    await new AnswerKey(answerKeyTwo).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should return modules list', async () => {
    const response = await request(app)
      .get('/api/modules')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.length).not.toBeNull();
  });

  it('Should return modules list with completed module', async () => {
    const response = await request(app)
      .get('/api/modules')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200);
      console.log(response.body);
    expect(response.body[0].completed).toBe(true);
  });

  it('Should get status 200 by to be a mentor', async () => {
    const response = await request(app)
      .get('/api/modules')
      .send()
      .set('Cookie', [`auth_token=${userTwo.tokens[0].accessToken}`])
      .expect(200);
  });
});
