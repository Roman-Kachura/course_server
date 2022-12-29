const {Router} = require('express');
const {uploadImage} = require('./upload.controller');
const {upload} = require('./upload.service');

const router = Router()

router.post('/', upload.single('file'), uploadImage)

module.exports = router