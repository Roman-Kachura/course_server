const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const commentsController = require('./commentsController');
const authMiddleWare = require("../middlewares/authMiddleware");

router.use((req, res, next) => {
    next();
});

router.get('/:id', commentsController.getComments);
router.delete('/:id/:authorID', authMiddleWare.checkAuthorization,commentsController.deleteComment);
router.post('/', [
    authMiddleWare.checkAuthorization,
    check('text', 'Text must have from 1 to 1000 characters!').isLength({min: 1, max: 1000})
], commentsController.createComment);


module.exports = router;