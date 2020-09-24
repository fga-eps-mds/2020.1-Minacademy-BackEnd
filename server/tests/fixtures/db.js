const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')
import userAuth from '../../config/userAuth.json'

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Jane Marie',
    email: 'jane_marie@gmail.com',
    password: 'janekajshdkajhd1234',
    userType: 'learner',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, userAuth.secret)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'joao',
    email: 'joao@mail.com',
    password: "joao123",
    age: 1,
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}


module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
}