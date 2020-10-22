const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const CouserCertificate = require('../models/CourseCertificate');
const { learnerOne, learnerTwo } = require('./fixtures/learner');
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
    await new CouserCertificate(certificateLearnerOne).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('Should generate a new certificate to a learner', async () =>{
    const response  = await request
      .patch('/certificates')
      .send()
      .set('Cookie', [`auth_token=${learnerTwo.tokens[0].accessToken}`])
    /* console.log("DAAAAAAAADDDDOOOOOOOSSSS DO TEEEEESSSSTTEEE");
    console.log(response.body.certificate.user);
    console.log(response.status);
    console.log(learnerTwo._id); */
    expect(response.status).toEqual(200);
    expect(response.body.certificate.user).toEqual(String(learnerTwo._id));
    }
  );
});