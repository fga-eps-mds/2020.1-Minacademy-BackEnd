const { Router } = require('express');
const progressController = require('../controllers/progressController');
const auth = require('../middleware/userAuth')

const router = new Router();

router.get('/progress', auth, progressController.getProgress);

module.exports = router;