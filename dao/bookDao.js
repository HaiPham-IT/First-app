const Book = require('../Model/book')

function getAll(){
    return Book.find().populate('user_id').populate('type');
}

function getById(id){
    return Book.findOne({_id: id}).populate('user_id').populate('type');
}

function remove(id){
    return Book.remove({_id: id});
}

function update(book){
    
}