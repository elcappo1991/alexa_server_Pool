var express = require('express');
var router = express.Router();
var passport = require('passport');
var lockService=require('../services/lockService')
var list =['living room','arpegio']
var fn=require('../bin/www')
var io=require('socket.io');
/* GET home page. */
router.get('/',function(req, res, next) {
	var tab=[]
	fn.clients.forEach(function(soc){
		tab.push(soc.name)
	})

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
     
      fn.sendSocketToSpeaker(req.body.key,function(res){
      	console.log('done')
      	res.send({status:'ok'})
      })
	
})

//get the home page function




module.exports = router;