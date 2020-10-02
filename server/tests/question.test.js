const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app')
const request = supertest(app)

const Module = require('../models/Module')
const Question = require('../models/Question')
const QuestionResult = require('../models/questionResult')
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

   it('Should get all questions', async () => {
      const response = await request.get('/questions')
         .send()
         .expect(200);

      expect(response.body.length).not.toBeNull();
   })

   it('Should get all questions for module 1', async () => {
      const response = await request.get('/questions?moduleNumber=1')
         .send()
         .expect(200);

      expect(response.body.length).not.toBeNull();

      const module = await Module.findById(response.body[0].module)
      expect(module).not.toBeNull()
      expect(module.moduleNumber).toBe(1)
   })

   it('Should not get questions', async () => {
      const response = await request.get('/questions?moduleNumber=0')
         .send()
         .expect(400);

      expect(response.body.error).toEqual('Modulo não encontrado');
   })

   it('Should answer question 1 incorrectly', async () => {
      const response = await request
      .post('/questions/result')
      .send({
         question: questions[0]._id,
         alternative: 'a',
         user: userOne._id
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      // .expect("OK")

      expect(response.ok).toBe(true)
      const result = await QuestionResult.findById(response.body._id)
      expect(result.isCorrect).toBe(false)
   })

   it('Should answer question 1 correctly', async () => {
      const response = await request
      .post('/questions/result')
      .send({
         question: questions[0]._id,
         alternative: 'b',
         user: userOne._id
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      // .expect("ok")

      expect(response.ok).toBe(true)
      const result = await QuestionResult.findById(response.body._id)
      expect(result.isCorrect).toBe(true)
   })

   it('Should not answer question', async () => {
      const response = await request
      .post('/questions/result')
      .send({
         question: '5f652249fc13ae49f0000000',
         alternative: 'a',
         user: userOne._id
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(400)
   })


   it('Should get question result for userOne', async () => {
      const response = await request
      .get('/questions/result')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200)

      expect(response.body.length).not.toBeNull()
   })

   it('Should get question result for question 1', async () => {
      const response = await request
      .get(`/questions/result?questions=${questions[0]._id}`)
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(200)

      expect(response.body.length).toBe(1)
   })
});
