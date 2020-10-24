const { Router } = require('express');
const courseCertificateController = require('../controllers/courseCertificateController');
const auth = require('../middleware/authentication');

const router = new Router();

router.patch('/certificates', auth, courseCertificateController.generateCertificate);
router.post('/certificates', courseCertificateController.getLearnerCertificate);

module.exports = router;
