var Book = require('../Model/book');
var router = require('express').Router();
var Type = require('../Model/type')

router.get('/', async (req, res) => {
        try{
            const book = await Book.find().populate('user_id').populate('type');
            res.json(book);
        }catch(err){
            res.json({message: err})
        }
    })

router.post('/', async (req, res) => {
    try {
        let type = req.body.type;
        let arrType = new Array()
        for(let i of type){
            if(i.name == undefined){
                res.status(404).json({message:"Missing book's type"})
            }
                const type = await Type.findOne({name: i.name})
            if(type == null){
                // const type1 = new Type({name: i.name})
                const saveType = await new Type({name: i.name}).save();
                arrType.push(saveType._id);
            }else{
                arrType.push(type._id);
            }  
        }
        console.log(arrType);

        const book = await new Book({
            name: req.body.name,
            type: arrType,
            author: req.body.author,
            img: req.body.img,
            user_id: req.body.user_id
        }).save()

        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({message: error})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('user_id').populate('type')
        res.json(book)
    } catch (err) {
        res.json({message:err})
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Book.remove({ _id: req.params.id })
        res.json(result)
    } catch (err) {
        res.json({message:err})
    }

})

router.patch('/:id', async (req, res) => {
    try {
        

        const result = await Book.updateOne(
            { _id: req.params.id},
            {$set: {type : req.body.type}})
            
        res.json(result)
    } catch (err) {
        res.json({message:err})
    }

})

module.exports = router;