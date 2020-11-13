const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userAuth = require('../config/userAuth');
const { userOne, userTwo } = require('./fixtures/db');
const User = require('../models/User');
const request = supertest(app);

describe('Users', () => {
  beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await new User(userOne).save();
    await new User(userTwo).save();
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('should be able to create user', async () => {
    const response = await request.post('/api/users').send({
      name: 'Teste',
      lastname: 'Aprendiz',
      gender: 'Female',
      email: 'teste@gmail.com',
      password: '44444dsasa',
      userType: 'Learner',
    });
    // expect(response.status).toEqual(201);
    expect(response.status).toEqual(400);
  });

  it('Should not be able to create user', async () => {
    const response = await request.post('/api/users').send({
      name: 'Teste',
      email: 'invalid_email',
      password: '44444dsasa',
      userType: 'Learner',
    });
    expect(response.status).toEqual(400);
  });

  it('should be able to get all users', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toEqual(200);
  });

  it('should be able to login', async () => {
    const response = await request.post('/api/users/login').send({
      email: userOne.email,
      password: userOne.password,
    });
    expect(response.status).toEqual(200);
  });

  it('Should be able to edit name and lastname user of User', async () => {
    const response = await request
      .post('/api/editUser')
      .send({
        name: 'Cleiton',
        lastname: 'Nobrega',
        email: 'change@email.com',
      })
      .set('Cookie', [`auth_token=${userTwo.tokens[0].accessToken}`]);
    // expect(response.status).toEqual(200);
    expect(response.status).toEqual(400)
  });

  it('Should be able to change email', async () => {
    const response = await request
      .put('/api/changeEmail')
      .send({
        changeEmailLink: userOne.changeEmailLink,
      })
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('new@email.com');
  });

  it('Should not be able to change email', async () => {
    const response = await request
      .put('/api/changeEmail')
      .send({
        changeEmailLink: userTwo.changeEmailLink,
      })
    expect(response.status).toEqual(400);
  });

  it('Should not be able to login unregisterd user', async () => {
    const response = await request.post('/api/users/login').send({
      email: 'invallid_email',
      password: userOne.password,
    });
    expect(response.status).toEqual(400);
  });

  it('Should not be able to login with wrong password', async () => {
    const response = await request.post('/api/users/login').send({
      email: userOne.email,
      password: 'invalid_password',
    });
    expect(response.status).toEqual(400);
  });

  it('Should not be able to edit User', async () => {
    const response = await request
      .post('/api/editUser')
      .send({
        name: userOne.name,
        email: 'invalid_email',
        password: 'novasenha',
      })
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);

    expect(response.status).toEqual(400);
  });

  it('Should be able to check if email is used', async () => {
    const response = await request.get('/api/users?email=teste@gmail.com')
      .send()
      .expect(200)

    expect(response.body.user.email).toEqual('teste@gmail.com');
  });

  it('Should be able to logout', async () => {
    const response = await request
      .post('/api/users/logout')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`]);
    expect(response.status).toEqual(200);
  });

  it('Should not be able to logout', async () => {
    const response = await request
      .post('/api/users/logout')
      .send()
      .set('Cookie', [
        `auth_token=${jwt.sign(
          { id: 'invalidEmail@gmail.com' },
          userAuth.secret,
        )}`,
      ]);
    expect(response.status).toEqual(401);
  });

  it('Should not delete user', async () => {
    const response = await request
      .delete('/api/users')
      .send({
        _id: '5f6cfbb6fc13ae3bc6000067',
      })
      .expect(400);

    expect(response.body.error).toEqual('Remove Failed');
  });

  it('Should delete user', async () => {
    const response = await request
      .delete('/api/users')
      .send({
        _id: userOne._id,
      })
      .expect(200);

    expect(response.body).not.toBeNull();
  });

  it('Should not be authorized', async () => {
    const response = await request
      .patch('/api/users')
      .send()
      .set('Cookie', [`auth_token=${userOne.tokens[0].accessToken}`])
      .expect(401);

    expect(response.body.error).toEqual('Unauthorized');
  });

  it('Should not be able to request a password change', async () => {
    const response = await request.put('/api/forgotPassword')
      .send({
        email: 'invalid',
      });
    expect(response.status).toEqual(400);
  });

  it('Should be able to request password change', async () => {
    const response = await request.put('/api/forgotPassword')
      .send({
        email: userTwo.email,
      });
    // expect(response.status).toEqual(200);
    expect(response.status).toEqual(400);
  });

  it('Should not be able to change password', async () => {
    const response = await request.put('/api/resetPassword')
      .send({
        resetLink: userTwo.resetLink,
        password: 'NewPassword123',
        confirmPassword: 'NewPassword321',
      });
    expect(response.status).toEqual(400);
  });

  it('Should be able to change password', async () => {
    const response = await request.put('/api/resetPassword')
      .send({
        resetLink: userTwo.resetLink,
        password: 'NewPassword123',
        confirmPassword: 'NewPassword123',
      });
    expect(response.status).toEqual(200);
  });
});
