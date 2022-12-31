const {Router} = require('express');
const {uploadImage} = require('./uploadController');
const {upload} = require('./uploadService');

const router = Router()

router.post('/', upload.single('file'), uploadImage)

module.exports = router;