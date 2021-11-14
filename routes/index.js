var bodyparser = require('body-parser')
var express = require('express');
//const Auth = require('../models/auth');

var router = express.Router();
var controler = require("../controllers/client/index")

//post setup
var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: true })

router.get('/', controler.index)
router.post('/',urlencodedParser,controler.Search)
module.exports = router