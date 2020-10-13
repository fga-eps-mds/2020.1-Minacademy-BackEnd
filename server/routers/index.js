const userRouter = require('./user');
const questionRouter = require('./question');
const moduleRouter = require('./module');
const asnwerRouter = require('./answer');
const progressRouter = require('./progress');
const learnerRouter = require('./learner');

module.exports = [
   userRouter,
   questionRouter,
   moduleRouter,
   asnwerRouter,
   progressRouter,
   learnerRouter
];