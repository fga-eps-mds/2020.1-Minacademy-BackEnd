const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../app')

const Module = require('../models/Module')
const { modules } = require('./fixtures/tutorial')

describe('Modules', () => {
   beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });
      await Module.insertMany(modules)
   });

   afterAll(async (done) => {
      await mongoose.connection.close();
      done();
   });

   it('Should return modules list', async () => {
      const response = await request(app).get('/modules')
         .send()
         .expect(200)

         expect(response.body.length).not.toBeNull()
   })
});
