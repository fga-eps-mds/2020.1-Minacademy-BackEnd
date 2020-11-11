const { Router } = require('express');
const courseCertificateController = require('../controllers/courseCertificateController');
const auth = require('../middleware/authentication');

const router = new Router();

router.post('/certificates', auth, courseCertificateController.generateCertificate);
router.get('/certificates/:_id', courseCertificateController.getCertificateById);
router.get('/certificates', auth, courseCertificateController.getAllCertificates);

module.exports = router;
