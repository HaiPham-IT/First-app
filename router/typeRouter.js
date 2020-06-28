var router = require('express').Router();

router.get('/', (res, req)=>{
    typeDao.find()
    .then(result => {req.status(200).json(result)})
    .catch(err => {req.status(404).json(err)})
    
})

router.get('/:id', (res, req)=>{
    typeDao.findById(res.params.id)
    .then(result => {req.status(200).json(result)})
    .catch(err => {req.status(404).json(err)})
    
})

router.delete('/:id', (res, req)=>{
    typeDao.remove({_id:res.params.id})
    .then(result => {res.status(200).json(result)})
    .catch(err => {res.status(404).json(err)})
})



module.exports = router;

