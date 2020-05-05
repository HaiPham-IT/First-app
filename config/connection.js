var config = require("./config")

module.exports = {
    getConnect: function(){
        return `${ config.connectDB }/${ config.dbName }`;
    }
}