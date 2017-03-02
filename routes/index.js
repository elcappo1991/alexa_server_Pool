var express = require('express');
var router = express.Router();
var passport = require('passport');
var lockService=require('../services/lockService')
var list =['living room','arpegio']

/* GET home page. */
router.get('/',function(req, res, next) {
console.log('fn recalled')
res.send('GET')




});


router.post('/',function(req,res,next){
	console.log(req.body.key)
	if (list.indexOf(req.body.key) != -1 ){
res.send('found')
	}else {
		res.send('not found')
	}
	
})
//get the home page function


module.exports = router;
