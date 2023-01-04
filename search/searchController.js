const searchService = require('./searchService');

class SearchController {
    async getHelpText(req, res, next) {
        const {value} = req.body;
        try {
            const resolve = await searchService.getHelpText(value);
            return res.status(200).json(resolve);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SearchController();