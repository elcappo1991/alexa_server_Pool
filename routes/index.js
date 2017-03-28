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
			res.send('found')
			res.end()

			
		}else {

			soc.linked=false
		}
		
	})
	
			res.send('not found')

})
router.post('/playnext',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'play_next',function(res){
			      	console.log('ok')
			      
			      })
					
				}
		
		})
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'play_next',function(res){
		      	console.log('done')
		      	
		      })


     	}
   
	res.send({status:'ok'})
})

router.post('/playprevious',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'play_prev',function(res){
				 	console.log(res)
				 	if(res != false ){
				 	res.send({status:'ok'})	
				 }else{
				 	res.send({status:'no'})	
				 }
			      	
			      
			      })
					
				}
		
		})
		res.send({status:'no'})	
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'play_prev',function(res){
   				console.log(res)
		       	if(res != false){
				 	res.send({status:'ok'})	
				 }else{
				 	res.send({status:'no'})	
				 }
		      	
		      })


     	}
   
	
})

router.post('/playtrack',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'play',function(res){
			      	console.log('ok')
			      
			      })
					
				}
		
		})
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'play',function(res){
		      	console.log('done')
		      	
		      })


     	}
   
	res.send({status:'ok'})
})

router.post('/increasevolume',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      valtoIncrease=req.body.nb
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'volume_increase:'+valtoIncrease,function(res){
			      	console.log('ok')
			      
			      })
					
				}
		
		})
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'volume_increase:'+valtoIncrease,function(res){
		      	console.log('done')
		      	
		      })


     	}
   
	res.send({status:'ok'})
})

router.post('/decreasevolume',function(req,res,next){
	  valtoDecrease=req.body.nb
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'volume_decrease:'+valtoDecrease,function(res){
			      	console.log('ok')
			      
			      })
					
				}
		
		})
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'volume_decrease:'+valtoDecrease,function(res){
		      	console.log('done')
		      	
		      })


     	}
   
	res.send({status:'ok'})
})


router.post('/pause',function(req,res,next){
      console.log('req.body.key',req.body.key)	
      if(!req.body.key){
   
      
      	fn.clients.forEach(function(soc){
      		
      		
			if (soc.linked ==true){
					
				 fn.sendSocketToSpeaker(soc.name,'pause_toggle',function(res){
			      	console.log('ok')
			      
			      })
					
				}
		
		})
      	
      }
     	else{
   			fn.sendSocketToSpeaker(req.body.key,'pause_toggle',function(res){
		      	console.log('done')
		      	
		      })


     	}
   
	res.send({status:'ok'})
})




module.exports = router;
