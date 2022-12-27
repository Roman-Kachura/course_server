const express = require('express');
const router = express.Router();
const usersController = require('./usersController');
const authMiddleWare = require('../middlewares/authMiddleware');
const {check} = require('express-validator');

router.use((req, res, next) => {
    next();
});

router.post('/registration', [
    check('email', 'Email is empty!').notEmpty(),
    check('name', 'Name must have from 3 to 10 symbols!').isLength({min: 3, max: 10}),
    check('password', 'Password must have from 4 to 15 symbols!').isLength({min: 4, max: 15})
], usersController.registration);
router.post('/login', usersController.login);
router.delete('/logout/:id', authMiddleWare.checkAuthorization, usersController.logout);
router.delete('/remove/:id', authMiddleWare.checkAuthorization, usersController.remove);
router.get('/', [
    authMiddleWare.checkAuthorization,
    authMiddleWare.checkUserRole
], usersController.getUsers);
router.get('/:id', usersController.getUser);

module.exports = router;