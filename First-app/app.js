require('dotenv').config()
var bodyparser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser')
const cors = require('cors');
const corsOptions = {
    exposedHeaders: 'Authorization',
};

const passport = require('passport')
const pasportConfig = require('./middlewares/passport')

app.use(bodyparser.json())
app.use(cors(corsOptions))
app.use('/uploads', express.static('uploads'))

var bookRouter = require('./router/bookRouter');
var adminRouter = require('./router/adminRouter');
var connect = require('./config/connection');

console.log(connect.getConnect());

mongoose.connect(connect.getConnect(),{useNewUrlParser: true});

// app.use('/books', passport.authenticate('jwt',{session: false}), bookRouter);
app.use('/books', bookRouter);
app.use('/admins', adminRouter);

app.listen(3000);

