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
	
	fn.clients.forEach(function(soc){
		if (soc.name == req.body.key){
			console.log('theire is a socket named as requested',soc.name)
			soc.linked=true
			
		}else {

			soc.linked=false
		}
		
	})
	res.send('treated post')
	

	
})
router.post('/playnext',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
      	console.log('inside if part')
      	fn.clients.forEach(function(soc){
		if (soc.linked == true){
				console.log('soc.name',sock.name)
			 fn.sendSocketToSpeaker(soc.name,function(res){
		      	console.log('done')
		      	res.send({status:'ok'})
		      })
					
		}
		
	})

      }
     
      fn.sendSocketToSpeaker(req.body.key,function(res){
      	console.log('done')
      	res.send({status:'ok'})
      })
	
})

//get the home page function




module.exports = router;
