const mongoose = require('mongoose');
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const userAuth = require('../config/userAuth')

const app = require('../app')
const request = supertest(app)

const Module = require('../models/Module')
const Question = require('../models/Question')
const AnswerKey = require('../models/answerKey')
const User = require('../models/User')
const { questions, modules } = require('./fixtures/tutorial')
const { userOne } = require('./fixtures/db')

describe('Questions', () => {
   beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });
      await new User(userOne).save()
      await Question.insertMany(questions)
      await Module.insertMany(modules)
   });

   afterAll(async done => {
      await mongoose.connection.dropDatabase()
      await mongoose.connection.close();
      done();
   });


   it('Should answer question 1 incorrectly', async () => {
      const response = await request
      .post('/answer')
      .send({
         question: questions[0]._id,
         alternative: 'a',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      // .expect("OK")

      expect(response.ok).toBe(true)
      expect(response.body.isCorrect).toBe(false)
   })

   it('Should answer question 1 correctly', async () => {
      const response = await request
      .post('/answer')
      .send({
         question: questions[0]._id,
         alternative: 'b',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      // .expect("ok")

      expect(response.ok).toBe(true)
      // const result = await QuestionResult.findById(response.body._id)
      expect(response.body.isCorrect).toBe(true)
   })

   it('Should not answer question', async () => {
      const response = await request
      .post('/answer')
      .send({
         question: '5f652249fc13ae49f0000000',
         alternative: 'a',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(400)
   })


   it('Should get question result for userOne', async () => {
      const response = await request
      .get('/answer')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200)

      expect(response.body.length).not.toBeNull()
   })

   it('Should get question result for question 1', async () => {
      const response = await request
      .get(`/answer?questions=${questions[0]._id}`)
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200)

      // expect(response.body).toBe(1)
      expect(response.body.queryAnswers.length).toBe(1)
   })

   it('Should not get question result', async () => {
      const response = await request
      .get(`/answer?questions=${questions[0]._id}`)
      .send()
      .set('Cookie', [`auth_token=$${jwt.sign({ id: 'maria@gmail.com' }, userAuth.secret)}`])
      .expect(401)
   })
});
