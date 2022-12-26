const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const commentsController = require('./commentsController');

router.use((req, res, next) => {
    next();
});

router.get('/:id', commentsController.getComments);


module.exports = router;