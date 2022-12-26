const commentsService = require('./commentsService');

class CommentsController {
    async getComments(req, res, next) {
        try {
            const response = await commentsService.getComments(req.params.id);
            return res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentsController();