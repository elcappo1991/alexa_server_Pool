var express = require('express');
var router = express.Router();
var passport = require('passport');
var lockService=require('../services/lockService')

/* GET home page. */
router.get('/',function(req, res, next) {
console.log('fn recalled')
return 'hello world'




});
//get the home page function


module.exports = router;
