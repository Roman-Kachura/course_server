const express = require('express');
const router = express.Router();
const usersController = require('./usersController');
const authMiddleWare = require('../middlewares/authMiddleware');
const {check} = require('express-validator');
const {upload} = require('../upload/uploadService');

router.use((req, res, next) => {
    next();
});

router.post('/registration', usersController.registration);
router.post('/social', usersController.authorizationWithSocial);
router.post('/login', usersController.login);
router.delete('/logout/:id', authMiddleWare.checkAuthorization, usersController.logout);
router.delete('/remove/:id', authMiddleWare.checkAuthorization, usersController.remove);
router.get('/', [
    authMiddleWare.checkAuthorization,
    authMiddleWare.checkUserRole
], usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/setting', [
    authMiddleWare.checkAuthorization,
    upload.single('file'),
    check('name', 'Name must have from 3 to 20 symbols!').isLength({min: 3, max: 20})
], usersController.changeUserSetting);

module.exports = router;