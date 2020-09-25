const { Router } = require('express');
const ModuleController = require('../controllers/ModuleController');

const router = new Router();

router.get('/modules', ModuleController.getModules);

module.exports = router;