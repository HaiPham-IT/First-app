const Admin = require('../Model/admin')
const authen = require('../authen/authen')
const passport = require('passport')
const pasportConfig = require('../middlewares/passport')


const getAdminById = (req, res, next) => {
    return Admin.findById({_id: req.params.id})
            .then((rs) => res.status(200).json(rs))
            .catch((err) => res.status(400).json(err))
}

const singin = (req, res, next) => {
    const {username, pass} = req.body
    Admin.findOne({username: username})
    .then((rs) => {
        if(!rs) return res.status(404).json({err:`${req.params.username} not exist`})
        if(pass !== rs.pass) res.status(400).json({err:'incorrect pass'})
        const token = authen.endCodeToken(rs._id)
        res.setHeader('Authorization', token)
        return res.status(200).json({success: true, id: rs._id , username: username})
        // res.status(200).json(rs)
    })
    .catch((err) => res.status(500).json(err))
}

const reSingin = (req, res, next) => {
    console.log(req.user)
    const token = authen.endCodeToken(req.user._id)
    res.setHeader('Authorization', token)
    return res.status(200).json({success: true, id: req.user._id , username: req.user.username})
}


const validate = (admin) =>{
    return Admin.findOne({username: admin.username})
    .then(rs => {
        if(rs) return Promise.reject(`Username [${admin.username}] already exists`)
        return Promise.resolve()
    })
}

const singup = (req, res, next) => {
    const {username, pass, information} = req.body
    const {fullName, age, img, dayOfBirth, phoneNumber, address} = information
    const admin = new Admin({
            username: username,
            pass: pass,
            information: {
                fullName: fullName,
                age: age,
                img: img,
                dayOfBirth: dayOfBirth,
                phoneNumber: phoneNumber,
                address: address,
            }
    })
    // validate(admin)
    // .then((rs) => {
        return admin.save()
    // })
    .then((rs) => res.status(200).json({success: true}))
    .catch(err => res.json(err))
}

const modifyAdmin = (req, res, next) => {
    const {pass, information} = req.body
    const {fullName, age, img, dayOfBirth, phoneNumber, address} = information
    const id = req.body.id
    
    const getmodifyfield = () => {
        let admin = {}
        let infor = {}
        if(pass) admin.pass = pass
        if(fullName) infor.fullName = fullName
        if(age) infor.age = age
        if(img) infor.img = img
        if(dayOfBirth) infor.dayOfBirth = dayOfBirth
        if(phoneNumber) infor.phoneNumber = phoneNumber
        if(address) infor.address = address
        admin.information = infor
        return Promise.resolve(admin)
    }
    return getmodifyfield()
            .then(rs => Admin.updateOne({"_id": id},{$set: rs}))
            .then(rs => res.status(200).json(rs))
            .catch(err => res.json(err))
}

module.exports = { getAdminById, singin, reSingin, singup, modifyAdmin }