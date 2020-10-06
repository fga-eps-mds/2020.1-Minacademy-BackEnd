const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/userAuth');

const router = new Router();

router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);
router.delete('/users', UserController.removeUser);
router.post('/users/login', UserController.authLogin);
router.post('/users/logout', auth, UserController.authLogout);
router.post('/editUser', auth, UserController.editUser);
router.put('/forgotPassword', UserController.forgotPassword);
router.put('/resetPassword');
module.exports = router;
