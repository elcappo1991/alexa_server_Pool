var express = require('express');
var router = express.Router();
var passport = require('passport');
var lockService=require('../services/lockService')
var list =['living room','arpegio']

/* GET home page. */
router.get('/',function(req, res, next) {
var tab=['arpegio','living room']
res.json({list:tab})




});


router.post('/',function(req,res,next){
	console.log(req.body.key)
	if (list.indexOf(req.body.key) != -1 ){
res.send('found')
	}else {
		res.send('not found')
	}
	
})
router.post('/playnext',function(req,res,next){
      console.log(req.body.key)	
     console.log('play next')
	res.send({status:'ok'})
})

//get the home page function


module.exports = router;
