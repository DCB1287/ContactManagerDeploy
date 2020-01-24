var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('bodyy-parser');
var path = require('path');



//Create connection to mongoDB here

var app = express();
app.use(session({
	secret:'secret',
	resave: true,
	saveUnitialized: true
}));