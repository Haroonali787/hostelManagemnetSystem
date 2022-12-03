var mysql = require("mysql")
var express = require("express")
var router = express.Router();
var bodyParser = require("body-parser")

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hmsystem"
})

con.connect(function(err)
{
    if(err){
        console.log('Database not connected')
        throw err
    }
    else
    {
        console.log('Database connected')
    }
})

module.exports.signup = function(username, email, password, status, callback){
    con.query('SELECT email from users WHERE email = "'+email+'" ', function(err, result){
        if(result[0]==undefined){
            var query = "INSERT INTO 'users'('username', 'email', 'password', 'email_status') VALUES('"+username+"', '"+email+"', '"+password+"', '"+status+"' )"
           console.log(query);
        }
        else{
            console.log("Error in insertion of email in DB")
        }
    })
}

module.exports.verify = function(username, email, token, callback){
    var query = "INSERT INTO 'verify'('username', 'email', 'token') VALUES('"+username+"', '"+email+"', '"+token+"')"
    con.query(query, callback)
}

module.exports.getuserid = function(email, callback){
    var query = "SELECT * FROM verify where email = '"+email+"' "
    con.query(query, callback)
}
