const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/authMiddleware');
const categoryController = require('./categoryController');
router.use((req, res, next) => {
    next();
});
router.post('/',[authMiddleWare.checkAuthorization,authMiddleWare.checkUserRole],categoryController.createCategory);
router.get('/',categoryController.getCategories);
module.exports = router;