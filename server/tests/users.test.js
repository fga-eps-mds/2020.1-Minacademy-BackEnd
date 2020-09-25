const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const request = supertest(app);

describe('Users', () => {
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

    it('should be able to create user', async () => {
        const response = await request.post('/users')
        .send({
            name: 'Jane Marie',
            email: 'jane_marie@gmail.com',
            password: 'janekajshdkajhd1234',
            userType: 'learner'
        });
        expect(response.status).toEqual(201);
    });

    it('should be able to get all users', async () => {
        const response = await request.get('/users');
        expect(response.status).toEqual(200);
    });
});