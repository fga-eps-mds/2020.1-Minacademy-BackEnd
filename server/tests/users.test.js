const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken')
const { userOne } = require('./fixtures/db')

const app = require('../app');
const auth = require('../middleware/userAuth');
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
    });

    it('should be able to create user', async () => {
        const response = await request.post('/users')
            .send({
                name: 'Maria',
                email: 'maria@gmail.com',
                password: '44444dsasa',
                userType: 'aprendiz',
            }
            );
        expect(response.status).toEqual(201);
    });

    it('should be able to get all users', async () => {
        const response = await request.get('/users');
        expect(response.status).toEqual(200);
    });

    it('should be able to login', async () => {
        const response = await request.post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            });
        expect(response.status).toEqual(200);

    });


    it('Should not be able to edit User', async () => {
        const response = await request.post('/editUser')
            .send({
                email: userOne.email,
                password: "novasenha",
                profileImg: "",
                about: ""
            });
        expect(response.status).toEqual(401); // Unauthorized
    });
});
