const {uploadToCloudinary} = require("./uploadService");
const errorService = require('../error/errorService');
const {bufferToDataURI} = require('./file');

class UploadController {
    async uploadImage(req, res, next) {
        try {
            const {file} = req
            if (!file) return errorService.BadRequest(error);

            const fileFormat = file.mimetype.split('/')[1]
            const {base64} = bufferToDataURI(fileFormat, file.buffer)

            const imageDetails = await uploadToCloudinary(base64, fileFormat)
            return imageDetails;
        } catch (error) {
            throw error;
        }
    }

    async uploadUserImage(req, res, next) {
        try {
            const {file} = req
            if (!file) return {url: null};

            const fileFormat = file.mimetype.split('/')[1]
            const {base64} = bufferToDataURI(fileFormat, file.buffer)

            const imageDetails = await uploadToCloudinary(base64, fileFormat)
            return imageDetails;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = new UploadController();