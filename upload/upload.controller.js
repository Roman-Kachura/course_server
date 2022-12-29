const {uploadToCloudinary} = require("./upload.service");
const errorService = require('../error/errorService');
const {bufferToDataURI} = require('./file');

const uploadImage = async (req, res, next) => {
    try {
        const {file} = req
        if (!file) return errorService.BadRequest(error);

        const fileFormat = file.mimetype.split('/')[1]
        const {base64} = bufferToDataURI(fileFormat, file.buffer)

        const imageDetails = await uploadToCloudinary(base64, fileFormat)
        return imageDetails;

        // res.json({
        //     status: 'success',
        //     message: 'Upload successful',
        //     data: imageDetails,
        // })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    uploadImage,
}