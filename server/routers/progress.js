const { Router } = require('express');
const ProgressController = require('../controllers/ProgressController');
const auth = require('../middleware/userAuth')

const router = new Router();

router.get('/progress', auth, ProgressController.getProgress);

module.exports = router;