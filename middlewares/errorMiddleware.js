const errorService = require('../error/errorService');

module.exports = function (err, req, res, next) {
    console.error(err);
    if (err instanceof errorService) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }

    return res.status(500).json({message: 'So-so, something went wrong!'})
}