const {Categories} = require("../shemas/shemas");
const errorService = require('../error/errorService');

class CategoryService {
    async createCategory(category) {
        try {
            const c = await Categories.find({category});
            if (c.length > 0) return errorService.BadRequest('There is already a category with this name');
            const newCategory = await Categories.create({category});
            await newCategory.save();
            const categories = await Categories.find({});
            return categories.map(c => c.category);
        } catch (e) {
            throw e;
        }
    }

    async getCategories() {
        try {
            const categories = await Categories.find({});
            return categories.map(c => c.category);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new CategoryService();