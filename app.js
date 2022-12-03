var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
const http = require('http');
const Server = require("socket.io");


var app = express();


app.set('view engine', 'ejs');
const server = http.createServer(app);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.PORT||3002;
server.listen(PORT,()=>console.log('server running on port 3002'));