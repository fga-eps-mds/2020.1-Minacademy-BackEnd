const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Module = require('../models/Module');
const User = require('../models/User');
const AnswerKey = require('../models/AnswerKey');
const { modules } = require('./fixtures/tutorial');
const { userOne, userTwo } = require('./fixtures/db');
const {answerKeyOne, answerKeyOneId} = require('./fixtures/answerKey');
const {module2} = require('./fixtures/module');

describe('Modules', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
   // await Module.insertMany(modules);
    await new User(userOne).save();
    await new User(userTwo).save();
    await new AnswerKey(answerKeyOne).save();
    await new Module(module2).save();

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
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.length).not.toBeNull();
  });

  it('Should return SOME THING THAT I DONT KNOW', async () => {
    console.log("SEGUNDO TESTEEEEE");
    await User.updateOne({_id: userTwo._id}, { $set: {answers: answerKeyOneId}});
    const response = await request(app)
      .get('/api/modules')
      .send()
      .set('Cookie', [`auth_token=${userTwo.tokens[0].accessToken}`])
      .expect(200);
      console.log(response.body);
    expect(response.body.length).not.toBeNull();
  });
});
