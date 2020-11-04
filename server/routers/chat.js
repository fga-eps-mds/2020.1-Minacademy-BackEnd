const { Router } = require('express');
const ChatController = require('../controllers/ChatController');
const auth = require('../middleware/authentication');
// const UserController = require('../controllers/UserController');
// const auth = require('../middleware/authentication');

const router = new Router();

router.get('/teste', auth, ChatController.teste)
router.get('/chat', auth, ChatController.getChat)
router.post('/chat', auth, ChatController.sendMessage)

module.exports = router;

// var router = express.Router();

// router.ws('/echo', function(ws, req) {
//   ws.on('message', function(msg) {
//     ws.send(msg);
//   });
// });

// app.use("/ws-stuff", router);