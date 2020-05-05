var router = require('express').Router();
const typeDao = require('../dao/typeDao');

router.get('/', (res, req)=>{
    typeDao.getAll()
    .then(result => {req.status(200).json(result)})
    .catch(err => {req.status(404).json(err)})
    
})

router.get('/:id', (res, req)=>{
    typeDao.getById(res.params.id)
    .then(result => {req.status(200).json(result)})
    .catch(err => {req.status(404).json(err)})
    
})

router.delete('/:id', (res, req)=>{
    typeDao.remove(res.params.id)
    .then(result => {res.status(200).json(result)})
    .catch(err => {res.status(404).json(err)})
})



module.exports = router;

