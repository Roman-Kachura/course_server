module.exports = class ErrorService extends Error {
    status;
    errors;
    message;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;

    }

    static UnauthorizedError() {
        throw new ErrorService(401, 'User is not authorized!');
    }

    static BadRequest(message, errors = []) {
        console.log(message)
        console.log(errors)
        throw new ErrorService(400, message, errors);
    }

    static Forbidden(){
        throw new ErrorService(403, 'You do not have enough authority!');
    }
}