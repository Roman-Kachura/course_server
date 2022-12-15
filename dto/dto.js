class Dto {
    user(model) {
        return {
            id: model._id,
            name: model.name,
            email: model.email,
            role: model.role,
            photo: model.photo
        }
    }
}

module.exports = new Dto();