module.exports = class ErrorService extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ErrorService(401, 'User is not authorized!');
    }

    static BadRequest(message, errors = []) {
        return new ErrorService(400, message, errors);
    }

    static Forbidden(){
        return new ErrorService(403, 'You do not have enough authority!');
    }
}