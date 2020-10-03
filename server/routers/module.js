const { Router } = require('express');
const ModuleController = require('../controllers/ModuleController');
const auth = require('../middleware/userAuth')

const router = new Router();

router.get('/modules', auth, ModuleController.getModules);

module.exports = router;