const request = require('supertest');
const server = require('../index.js');
const User = require('../models/User.js');

beforeAll(async () => {

});

afterAll(() => {
    User.findOneAndDelete({ email: 'jane_marie@gmail.com'});
    server.close();
    console.log('Testing ended!');
});

describe('User testing', () => {
    test('Create user ', async () => {
        const response = await request(server)
            .post('/users')
            .send({
                name: 'Jane Marie',
                email: 'jane_marie@gmail.com',
                password: 'janekajshdkajhd1234',
                userType: 'learner'
            });
        expect(response.status).toEqual(201);
    });

    test('Get users', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toEqual(200);
    });

});