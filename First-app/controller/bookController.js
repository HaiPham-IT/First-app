const Book = require('../Model/book')
const Type = require('../Model/type')
const fs = require('fs')
const { promisify } = require('util')
const unlink = promisify(fs.unlink)



const getBooks = (req, res) => {
    return Book.find().populate('user_id').populate('type')
            .then(result => {
                const obj = {
                    count: result.length,
                    result: result.map(obj => {
                        return {
                            id: obj._id,
                            name: obj.name,
                            type: obj.type,
                            author: obj.author,
                            img: obj.img
                        }
                    })
                }
                res.status(200).json(obj)
            })
            .catch(err => res.status(500).json(err))
}

const getBooksByUserId = (req, res) =>{
    return Book.find({user_id: req.params.id}).populate('trade_list').populate('type')
            .then(books => res.status(200).json({
                count: books.length,
                result: books.map(obj => {
                    return {
                        id: obj._id,
                        name: obj.name,
                        type: obj.type,
                        author: obj.author,
                        img: obj.img,
                        trade_list: obj.trade_list.map(trade_book => {
                            return {
                                id: trade_book._id,
                                name: trade_book.name,
                                img: trade_book.img
                            }
                        })
                    }
                })
            }))
}

const createBook = (req, res) => {
    console.log(req.file);
    console.log(req.body)
    
    const {name, types, author, user_id} = req.body
    let img = ""
    if(req.file){
        img = req.file.path
    }
    if(!types) res.status(403).json('missing type')
    
    return arrType(types)
            .then(value => {
                return new Book({
                        name: name,
                        type: value,
                        author: author,
                        img: img,
                        user_id: user_id
                }).save()
            })
            .then(rs => res.status(200).json(rs))
            .catch(err => {
                if(req.file){
                    unlink(img).then(done => {
                        console.log(`delete ${img} successfull`)
                        res.status(500).json(err)
                    })
                }else{
                    res.status(500).json(err)
                }
                
                
            })
}

const arrType = (types) => {
    return Promise.all((types||[]).map((e) => {
        return Type.findOne({name: e})
        .then(result => result === null ? new Type({name: e}).save() : Promise.resolve(result._id))
        .then(rs => typeof(rs) === "object" ?  Promise.resolve(rs._id) :  Promise.resolve(rs))
        .catch(err => Promise.reject(err))
    }))
}
const getBookById = (req, res) => {
    return Book.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}


const deleteBook = (req, res) => {
    return Book.remove({_id: req.params.id})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
}

const modifyBook = (req, res) => {
    const { name, type, author} = req.body
    const img = res.file.path
    let book = {}
    if(name) book.name = name
    if(author) book.author = author
    if(img) book.img = img

    return arrType(type)
            .then((rs) => {
                if(rs) book.type = rs
                return Book.updateOne(
                    { _id: req.body._id},
                    {$set: book}
                )
            })
            .then(rs => res.status(200).json({success: 'true'}))
            .catch(err => res.json(err))
}

module.exports = { getBooks, createBook, getBookById, deleteBook, modifyBook, getBooksByUserId }