const { Router } = require('express');
const router = Router();

const UserController = require('./controllers/UserController');
const auth = require('./middleware/userAuth');

router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);
router.delete('/users', UserController.removeUser);
router.post('/users/login', UserController.authLogin);
router.post('/users/logout', auth, UserController.authLogout);
router.post('/users/:id', UserController.editUser);

module.exports = router;