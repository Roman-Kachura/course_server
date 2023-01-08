const commentsService = require('./commentsService');
const {User} = require("../shemas/shemas");

class CommentsController {
    async getComments(req, res, next) {
        try {
            const comments = await commentsService.getComments(req.params.id,+req.query.page);
            return res.status(200).json(comments);
        } catch (e) {
            next(e);
        }
    }

    async createComment(req, res, next) {
        const {reviewID, authorID, text} = req.body;
        try {
            const comment = await commentsService.createComment(reviewID, authorID, text);
            return res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req, res, next) {
        const {id, authorID} = req.params;
        try {
            const comment = await commentsService.deleteComment(id, authorID);
            return res.status(200).json(comment);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentsController();