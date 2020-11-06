const { Router } = require('express');
const ChatController = require('../controllers/ChatController');
const auth = require('../middleware/authentication');

const router = new Router();

router.get('/chat', auth, ChatController.getChat);
router.post('/chat', auth, ChatController.sendMessage);

module.exports = router;
