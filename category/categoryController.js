const categoryService = require('./categoryService');

class CategoryController {
    async createCategory(req, res, next) {
        try {
            const categories = await categoryService.createCategory(req.body.category);
            return res.status(200).json({categories});
        } catch (e) {
            next(e);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await categoryService.getCategories();
            return res.status(200).json({categories});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CategoryController();