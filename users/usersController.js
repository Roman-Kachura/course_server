const usersService = require('./usersService');
const {validationResult} = require('express-validator');
const errorService = require('../error/errorService');

class UsersController {
    async registration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(errorService.BadRequest('Errors of registration', errors.array()));
        }
        try {
            const {name, email, password} = req.body;
            if (!(/^[\w]+[\.\-\_]{0,}[\w]+@[\w]+\.[\w]{2,4}/.test(email))) {
                return next(errorService.BadRequest('Email is not correct!', errors.array()));
            }
            const response = await usersService.registration(name, email, password);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const response = await usersService.login(email, password);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const response = await usersService.logout(id, token);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async remove(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const response = await usersService.remove(id, token);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UsersController();