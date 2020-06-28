var router = require('express').Router();
const upload = require('../controller/uploadImg')
const { getBooks, createBook, getBookById, deleteBook, modifyBook, getBooksByUserId } = require('../controller/bookController')
const { getTypes } = require('../controller/typeController')

router.get('/', getBooks)
        .get('/:id', getBookById)
        .post('/', upload.single('img'),  createBook)
        .delete('/:id', deleteBook)
        .patch('/', modifyBook)
        .get('/types', getTypes)
        .get('/user/:id', getBooksByUserId)

module.exports = router;