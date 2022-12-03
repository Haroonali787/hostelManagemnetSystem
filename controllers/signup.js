var express = require('express')
var router = express.Router();
var bodyParser = require('body-parser')
var db = require.main.require('./models/db_controller')
var mysql = require('mysql')
var nodemailer = require('nodemailer')
var randomToker = require('random-token')
const {check, validationResult, body} = require('express-validator')

router.use(bodyParser.urlencoded({entended:true}))
router.use(bodyParser.json())

router.post('/', [check('username').notEmpty().withMessage("The username is required"),
    check('password').notEmpty().withMessage("The password is required"),
    check('email').notEmpty().withMessage("The email is required")
    
    ], function(req, res){
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }
        var email_status = "not_verified"
        var email = req.body.email
        var username = req.body.username

        db.signup(req.body.username, req.body.email, req.body.password, email_status)
        var token = randomToken(8)
        db.verify(req.body.username, email, token)

        db.getuserid(email, function(err, result){
            var id = result[0].id;
            var output = '<p>Hi ${username},</p><p>Thanks for signup. Your verification id and token is given below:</p><br><ul><li>USER ID: ${id}</li><li>TOKEN: ${token}</li><br></ul><p>Or click here: <a href="http://localhost:3002/verify">Verify</a></p>';
          
            var transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port: 465,

                auth:{
                    user: "hostelmanagementsystem123@gmail.com",
                    pass: "waqhqotpwywxfjux"
                }
            })
            var mailOptions={
                from: 'hostelmanagementsystem123@gmail.com',
                to: email,
                subject: 'Email Verification',
                html: output
            }
            transporter.sendMail(mailOptions, function(err,info){
                if(err){
                    return console.log(err)
                }
                console.log(info)
            })
            res.send('Check your email for token to verify')
        })
})

module.exports = router;