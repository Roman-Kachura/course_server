const jwt = require('jsonwebtoken');
const {Token} = require("../shemas/shemas");

class TokenService {
    async generationToken(payload) {
        return await jwt.sign(payload, process.env.ACCESS_TOKEN);
    }

    async saveToken(id, token) {
        const candidate = await Token.findOne({user: id});
        if (candidate) {
            candidate.token = token;
            return candidate.save();
        }
        const resolve = await Token.create({user: id, token});
        return resolve;
    }

    async removeToken(id, token) {
        const resolve = await Token.deleteOne({user: id, token});
        return resolve;
    }

    async checkTokenValidation(token) {
        try {
            const isValid = await jwt.verify(token, process.env.ACCESS_TOKEN);
            return isValid;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new TokenService();