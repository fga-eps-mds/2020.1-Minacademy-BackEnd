const userRouter = require('./user');
const questionRouter = require('./question');
const moduleRouter = require('./module');
const asnwerRouter = require('./answer');
const progressRouter = require('./progress');
const learnerRouter = require('./learner');
const mentorRouter = require('./mentor');
const certificateRouter = require('./courseCertificate');
const chatRouter = require('./chat')

module.exports = [
  userRouter,
  questionRouter,
  moduleRouter,
  asnwerRouter,
  progressRouter,
  learnerRouter,
  mentorRouter,
  certificateRouter,
  chatRouter
];
