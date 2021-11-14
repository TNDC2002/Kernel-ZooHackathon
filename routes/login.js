// import thư viện
var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser')

const LoginController = require('../controllers/client/login');


//post setup
var app = express()
var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: true })


//ejs linker
router.get('/', LoginController.index);

//login
router.post('/', urlencodedParser, LoginController.login);

module.exports = router

