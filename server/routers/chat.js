const { Router } = require('express');
const ChatController = require('../controllers/ChatController');
// const UserController = require('../controllers/UserController');
// const auth = require('../middleware/authentication');

const router = new Router();

router.get('/chat', ChatController.teste)

module.exports = router;

// var router = express.Router();

// router.ws('/echo', function(ws, req) {
//   ws.on('message', function(msg) {
//     ws.send(msg);
//   });
// });

// app.use("/ws-stuff", router);