// import thư viện
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

const RegisterController = require('../controllers/client/register');

//post setup
var app = express()
var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: true })


//ejs linker
router.get('/', RegisterController.index)

//register
router.post('/', urlencodedParser, RegisterController.Register)

// verify account
router.get('/verify/:user/:secret_mail', RegisterController.VerifyAccount);

module.exports = router
