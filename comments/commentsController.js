const commentsService = require('./commentsService');
const {User} = require("../shemas/shemas");

class CommentsController {
    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments(req.params.id);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentsController();