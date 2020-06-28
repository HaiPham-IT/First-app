const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy

const {ExtractJwt} = require('passport-jwt')

const Admin = require('../Model/admin')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    try {
        console.log('payload', payload)
        let currentTime = new Date().getTime();
        if(currentTime>payload.exp)return done(null, false)
        Admin.findById(payload.sub)
        .then(rs => {
            if(!rs) return done(null, false)
            return done(null, rs)
        })
    } catch (error) {
        done(errer, false)
    }

}))