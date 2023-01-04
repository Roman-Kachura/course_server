const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const searchController = require('./searchController');

router.use((req, res, next) => {
    next();
});

router.post('/', searchController.getHelpText);

module.exports = router;