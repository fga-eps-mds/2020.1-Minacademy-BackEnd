const mongoose = require('mongoose');
const supertest = require('supertest')

const app = require('../app')
const request = supertest(app)

const Module = require('../models/Module')

describe('Questions', () => {
   beforeAll(async () => {
      mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });
   });

   afterAll(async (done) => {
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
});
