const tokenService = require("../token/tokenService");
const errorService = require('../error/errorService');
const {User} = require("../shemas/shemas");

class AuthMiddleware {
    async checkAuthorization(req, res, next) {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) return next(errorService.UnauthorizedError());
            const token = authorization.split(' ')[1];
            if (!token) return next(errorService.UnauthorizedError());
            const isValidateToken = await tokenService.checkTokenValidation(token);
            if (!isValidateToken) return next(errorService.UnauthorizedError());
            next();
        } catch (e) {
            return next(errorService.BadRequest(e));
        }
    }

    async checkUserRole(req, res, next) {
        try {
            const user = await tokenService.checkTokenValidation(req.headers.authorization.split(' ')[1]);
            if (user.role !== 'ADMIN') return next(errorService.Forbidden());
            next();
        } catch (e) {
            return next(errorService.BadRequest(e));
        }
    }
}

module.exports = new AuthMiddleware();