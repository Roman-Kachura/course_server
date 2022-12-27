const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const ratingController = require('./ratingController');
const authMiddleWare = require('../middlewares/authMiddleware');

router.use((req, res, next) => {
    next();
});

router.get('/', authMiddleWare.checkAuthorization, ratingController.getRating);
router.post('/', authMiddleWare.checkAuthorization, ratingController.changeRating);


module.exports = router;