const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { userOne, userTwo } = require('./fixtures/db');
const User = require('../models/User');
const app = require('../app');

const request = supertest(app);
const userAuth = require('../config/userAuth');

describe('Users', () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    await new User(userOne).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('should be able to create user', async () => {
    const response = await request.post('/users')
      .send({
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '44444dsasa',
        userType: 'aprendiz',
      });
    expect(response.status).toEqual(201);
  });

  it('Should not be able to create user', async () => {
    const response = await request.post('/users')
      .send({
        name: 'Teste',
        email: 'invalid_email',
        password: '44444dsasa',
        userType: 'aprendiz',
      });
    expect(response.status).toEqual(400);
  });

  it('should be able to get all users', async () => {
    const response = await request.get('/users');
    expect(response.status).toEqual(200);
  });

  it('should be able to login', async () => {
    const response = await request.post('/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      });
    expect(response.status).toEqual(200);
  });

  it('Should not be able to login unregisterd user', async () => {
    const response = await request.post('/users/login')
      .send({
        email: 'invallid_email',
        password: userOne.password,
      });
    expect(response.status).toEqual(400);
  });

  it('Should not be able to login with wrong password', async () => {
    const response = await request.post('/users/login')
      .send({
        email: userOne.email,
        password: 'invalid_password',
      });
    expect(response.status).toEqual(400);
  });

  it('Should be able to edit User', async () => {
    const response = await request.post('/editUser')
      .send({
        name: 'Cleiton',
        email: userOne.email,
        password: 'novasenha',
        profileImg: '',
        about: '',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Cleiton');
  });

  it('Should not be able to edit User', async () => {
    const response = await request.post('/editUser')
      .send({
        name: userOne.name,
        email: 'invalid_email',
        password: 'novasenha',
        profileImg: '',
        about: '',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);

    expect(response.status).toEqual(400);
  });

  it('Should be able to logout', async () => {
    const response = await request.post('/users/logout')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
  });

  it('Should not be able to logout', async () => {
    const response = await request.post('/users/logout')
      .send()
      .set('Cookie', [`auth_token=${jwt.sign({ id: 'invalidEmail@gmail.com' }, userAuth.secret)}`]);
    expect(response.status).toEqual(401);
  });

  it('Should delete user', async () => {
    const response = await request.delete('/users')
      .send({
        _id: userOne._id,
      })
      .expect(200);
  });

  it('Should not delete user', async () => {
    const response = await request.delete('/users')
      .send({
        _id: '5f6cfbb6fc13ae3bc6000067',
      })
      .expect(400);
  });
  
    it('Should be able to send a e-mail', async () => {
        const response = await request.put('/forgotPassword')
            .send({
                email: userOne.email
            })
        expect(response.status).toEqual(200);
    });

});
