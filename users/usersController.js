const usersService = require('./usersService');
const {validationResult} = require('express-validator');
const errorService = require('../error/errorService');
const uploadController = require("../upload/uploadController");

class UsersController {
    async registration(req, res, next) {
        try {
            const {name, email, password, uid} = req.body;
            const response = await usersService.registration(name, email, password, uid);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async authorizationWithSocial(req, res, next) {
        try {
            const {displayName, email, photoURL, uid} = req.body;
            const response = await usersService.social(displayName, email, photoURL, uid);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const response = await usersService.login(email, password);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const response = await usersService.logout(id, token);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async remove(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const response = await usersService.remove(id, token);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        const currentPage = req.query.page;
        try {
            const response = await usersService.getUsers(currentPage);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const response = await usersService.getUser(req.params.id);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async changeUserSetting(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(errorService.BadRequest('Some error!', errors.array()));
        }

        try {
            const image = await uploadController.uploadImageWithoudError(req, res, next);
            const resolve = await usersService.changeUserSetting(req.body.id, req.body.name, image.url)
            return res.status(200).json(resolve);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UsersController();