const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const CouserCertificate = require('../models/CourseCertificate');
const { learnerOne, learnerTwo, learnerThree, learnerFour, learnerSix } = require('./fixtures/learner');
const { mentorOne } = require('./fixtures/mentor');
const {certificateLearnerOne} = require('./fixtures/couserCertificate')

const request = supertest(app);

describe('CurserCertificate', ()=>{
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
    await new Mentor(mentorOne).save();
    await new CouserCertificate(certificateLearnerOne).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should generate a new certificate to a learner', async () =>{
    const response  = await request
      .patch('/api/certificates')
      .send()
      .set('Cookie', [`auth_token=${learnerTwo.tokens[0].accessToken}`])
    expect(response.status).toEqual(200);
    expect(response.body.user).toEqual(String(learnerTwo._id));
    }
  );

  it('Should generate a new certificate to a learner and mentor', async () =>{
    await request
      .patch('/api/learners')
      .send()
      .set('Cookie', [`auth_token=${learnerFour.tokens[0].accessToken}`]);
    const response = await request
      .patch('/api/certificates')
      .send()
      .set('Cookie', [`auth_token=${learnerFour.tokens[0].accessToken}`])
    expect(response.status).toEqual(200);
    expect(response.body.user).toEqual(String(learnerFour._id));
  })

  it('Should not generate a new certificate to a learner', async () =>{
    const response  = await request
      .patch('/api/certificates')
      .send()
      .set('Cookie', [`auth_token=${learnerOne.tokens[0].accessToken}`])
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('you already have a learner certificate');
  });

  it('Should get a certificate', async () =>{
    const response  = await request
      .post('/api/certificates')
      .send({_id: certificateLearnerOne._id})
    expect(response.status).toEqual(200);
   //expect(response.body).toEqual(certificateLearnerOne);
  });

  it('Should not get a certificate', async () =>{
    const response  = await request
      .post('/api/certificates')
      .send({_id: "idInexistente"})
    expect(response.status).toEqual(400);
  });

  it('Should get all certificates', async() =>{
    const response = await request
      .get('/api/certificates')
      .set('Cookie', [`auth_token=${mentorOne.tokens[0].accessToken}`])
    expect(response.status).toEqual(200);
  })

  it('Should not get all certificates', async() => {
    const response = await request
      .get('/api/certificates')
      .set('Cookie', [`auth_token=${learnerThree.tokens[0].accessToken}`]);
    expect(response.status).toEqual(400);
  });
});