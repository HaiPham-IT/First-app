var bodyparser = require('body-parser');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser')

app.use(bodyparser.json())

var bookRouter = require('./router/bookRouter');
var typeRouter = require('./router/typeRouter');
var connect = require('./config/connection');

console.log(connect.getConnect());

mongoose.connect(connect.getConnect(),{useNewUrlParser: true});

app.use('/books', bookRouter);
app.use('/types', typeRouter);

app.listen(3000);

