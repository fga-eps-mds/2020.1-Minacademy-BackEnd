const request = require('supertest')
const app = require('../app')

test('Should return modules list', async (done) => {
   const response = await request(app).get('/modules')
      .send()
      .expect(200)

      expect(response.body.length).not.toBeNull()
      done()
})
