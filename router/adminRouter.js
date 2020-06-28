const router = require('express').Router()
const { getAdminById, singin, reSingin, singup, modifyAdmin } = require('../controller/adminController')
const passport = require('passport')
const pasportConfig = require('../middlewares/passport')


router.get('/:id', getAdminById)
        .post('/signin', singin)
        .get('/login/reSignin', passport.authenticate('jwt',{session: false}), reSingin)
        .post('/signup', singup)
        .patch('/update', modifyAdmin)

module.exports = router
