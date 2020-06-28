const Type = require('../Model/type')

const getTypes = (req, res) => {
    return Type.find()
            .then(result => req.status(200).json(result))
            .catch(err => req.status(404).json(err))
}

module.exports = {getTypes}