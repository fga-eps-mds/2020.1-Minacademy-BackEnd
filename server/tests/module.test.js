const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Module = require('../models/Module');
const User = require('../models/User');
const { modules } = require('./fixtures/tutorial');
const { userOne } = require('./fixtures/db');

describe('Modules', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await Module.insertMany(modules);
    await new User(userOne).save();
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
});
