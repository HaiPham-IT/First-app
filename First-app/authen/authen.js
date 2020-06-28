const JWT = require('jsonwebtoken')
var config = require("../config/config.json")

const endCodeToken = (usernameId) => {
    return JWT.sign({
        iss: 'Hai Pham',
        sub: usernameId,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 30000
    }, process.env.JWT_SECRET)
}

module.exports = {endCodeToken}