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
  learnerSix,
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
    await new Learner(learnerSix).save();
    await new Mentor(mentorOne).save();
    await new Mentor(mentorTwo).save();
    await new Mentor(mentorThree).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it("Should not be able to get learnerOne's mentor", async () => {
    const response = await request
      .get('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('Learner does not have a mentor');
  });

  it('Should be able to atribute one mentor to one learner and more one learner to one mentor', async () => {
    const response = await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();
  });

  it('Should not be able to assign a mentor to learnerOne', async () => {
    const response = await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('Learner already has a mentor');
  });

  it("Should be able to get learnerOne's mentor", async () => {
    const response = await request
      .get('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body).not.toBeNull();
  });

  it('Should not be able to atribute one mentor to one learner', async () => {
    await Mentor.updateMany({}, { isAvailable: false });
    const response = await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerTwo.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.mentor_request).toEqual(true);
  });

  it('A mentor should not be able to request a mentor', async () => {
    const response = await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(403);

    expect(response.body.message).toEqual('Forbidden');
  });

  it('Should be able to cancel a mentor request', async () => {
    //await Mentor.updateMany({}, { isAvailable: false });
    const response = await request
      .patch('/api/learners/request')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(false);
  });

  it("Should be able to unassign learnerOne's mentor", async () => {
    const response = await request
      .delete('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
      .expect(200);

    expect(response.body.mentor).toBeNull();
  });

  it("Should not be able to unassign learnerTwo's mentor", async () => {
    const response = await request
      .delete('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerTwo.tokens[0].accessToken}`])
      .expect(400);

    expect(response.body.error).toEqual('Learner does not have a mentor');
  });

  it('A mentor should not be able to request a mentor', async () => {
    const response = await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
      .expect(403);

    expect(response.body.message).toEqual('Forbidden');
  });

  it('Should not be able to become a mentor', async () => {
    const response = await request
      .patch('/api/learners/promote')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`]);
    expect(response.body.error).toEqual("User did not conclude Tutorial");
  });

  it('Should be able to become a mentor', async () => {
    const response = await request
      .patch('/api/learners/promote')
      .send()
      .set('Cookie', [`auth_token=${learnerSix.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
  });

});
