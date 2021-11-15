var express = require('express');

var router = express.Router();
var myMiddleware = require('../models/auth')
var controller = require('../controllers/client/profile')

//post setup
var bodyparser = require('body-parser')
var jsonParser = bodyparser.json()
var urlencodedParser = bodyparser.urlencoded({ extended: true })

router.get('/', myMiddleware,controller.index)
router.post('/',controller.update)

module.exports = router

