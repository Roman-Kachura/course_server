class Dto {
    user(model) {
        return {id: model._id, name: model.name, email: model.email, role: model.role}
    }
}

module.exports = new Dto();