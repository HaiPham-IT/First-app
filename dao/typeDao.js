const Type = require('../Model/type');

function getById(id) {
    return Type.findById(id)
}

function getByName(name){
    return Type.findOne({name: name});
}

function getAll(){
    return Type.find();
}

function remove(id){
    return Type.remove({_id:id})
}

module.exports.getById = getById;

module.exports.getByName = getByName;

module.exports.getAll = getAll;

module.exports.remove = remove;