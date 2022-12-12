// class ErrorService {
//     setAuthorizationError(req, res) {
//         res.status(401).json({message: 'You are not authorized!'});
//         throw 'You are not authorized!';
//     }
// }
//
// module.exports = new ErrorService();

module.exports = class ErrorService extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ErrorService(401, 'User is not authorized!')
    }

    static BadRequest(message, errors = []) {
        return new ErrorService(400, message, errors);
    }
}