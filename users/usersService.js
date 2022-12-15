const {User} = require('../shemas/shemas');
const bcrypt = require('bcrypt');
const dto = require('../dto/dto');
const tokenService = require('../token/tokenService');
const errorService = require('../error/errorService');

class UsersService {
    async registration(name, email, password) {
        try {
            const candidate = await User.findOne({email});
            if (candidate) return errorService.BadRequest('User with this email is already registered');
            const hash = await bcrypt.hashSync(password, 7);
            const user = await User.create({name, email, password: hash, role: 'USER'});
            const payload = dto.user(user);
            const token = await tokenService.generationToken(payload);
            await tokenService.saveToken(payload.id, token);
            return {user: payload, token};
        } catch (e) {
            throw e;
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({email});
            if (!user) return errorService.BadRequest('User with this email is not found!');
            const isValidate = await bcrypt.compareSync(password, user.password);
            if (!isValidate) return errorService.BadRequest('Email or password is not correct!');
            const payload = dto.user(user);
            const token = await tokenService.generationToken(payload);
            await tokenService.saveToken(payload.id, token);
            return {user: payload, token};
        } catch (e) {
            throw e;
        }
    }

    async logout(id, token) {
        try {
            return await tokenService.removeToken(id, token);
        } catch (e) {
            throw e;
        }
    }

    async remove(id, token) {
        try {
            const user = await User.deleteOne({_id: id});
            if (!user) return errorService.BadRequest('User is not found!');
            await tokenService.removeToken(id, token);
            return user;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UsersService();