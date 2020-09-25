const request = require('supertest')
const app = require('../app')
const Module = require('../models/Module')

test('Should get all questions', async (done) => {
   const response = await request(app).get('/questions')
      .send()
      .expect(200);

      expect(response.body.length).not.toBeNull();
      done()
})

test('Should get all questions for module 1', async (done) => {
   const response = await request(app).get('/questions?moduleNumber=1')
      .send()
      .expect(200);

      expect(response.body.length).not.toBeNull();

      const module = await Module.findById(response.body[0].module)
      expect(module).not.toBeNull()
      expect(module.moduleNumber).toBe(1)
      done()
})

test('Should not get questions', async (done) => {
   const response = await request(app).get('/questions?moduleNumber=0')
      .send()
      .expect(400);

      expect(response.body.error).toEqual('Modulo não encontrado');
      done()
})
