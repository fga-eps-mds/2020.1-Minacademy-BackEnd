const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/userAuth');

const router = new Router();

router.get('/users', UserController.getUsers);
router.get('/isEmailUsed', UserController.getIsEmailUsed);
router.post('/users', UserController.createUser);
router.delete('/users', UserController.removeUser);
router.post('/users/login', UserController.authLogin);
router.post('/users/logout', auth, UserController.authLogout);
router.post('/editUser', auth, UserController.editUser);
router.post('/changeToLearner', auth, UserController.changeToLearner);

module.exports = router;
