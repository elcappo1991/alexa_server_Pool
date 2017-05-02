var express = require('express');
var router = express.Router();
var passport = require('passport');
var lockService = require('../services/lockService')
var list = ['living room', 'arpegio']
var fn = require('../bin/www')
var io = require('socket.io');


/* GET home page. */
router.get('/', function(req, res, next) {
    var tab = []
    fn.clients.forEach(function(soc) {
        tab.push(soc.name)
    })

    res.json({ list: tab })

});


router.post('/', function(req, res, next) {
    console.log(req.body.key)
    ctr = 0
    i = 0
    if (fn.clients.length == 0) {
        res.send('not found')
    } else {
        fn.clients.forEach(function(soc) {
            if (soc.name == req.body.key) {
                console.log('theire is a socket named as requested', soc.name)
                soc.linked = true
                i = 1





            } else {

                soc.linked = false
            }




            ctr++;
            if (ctr === fn.clients.length) {
                if (i == 0) {
                    res.send('not found')
                } else {
                    return res.send('found')
                }

            }




        })

    }



})

router.get('/getConnectedDevice', function(req, res, next) {
    var i = 0
    fn.clients.forEach(function(soc) {
        if (soc.linked == true) {
            i = 1
            res.send(soc.name)
        }
    })


    if (i == 0) {
        res.send(false)
    }


})

router.post('/linktoanyone', function(req, res, next) {
    console.log('inside link to any one');
    console.log(req.body.key)
    console.log(fn.clients.length)

    if (fn.clients.length == 0) {
        console.log('inside if pas de client')
        res.send('error')
    } else {
        console.log('inside if theire is a client')
        fn.clients[0].linked = true
        res.send(fn.clients[0].name)
    }




})

router.post('/playnext', function(req, res, next) {
    console.log('req.body.key', req.body.key)

    if (!req.body.key) {


        fn.clients.forEach(function(soc) {



            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'play_next', function(result) {



                    if (result != false) {


                        res.send({ status: 'ok' })
                    } else {

                        res.send({ status: 'no' })
                    }


                })

            }

        })

        res.send({ status: 'no' })




    } else {
        fn.sendSocketToSpeaker(req.body.key, 'play_next', function(result) {
            if (result != false) {

                res.send({ status: 'ok' })
            } else {

                res.send({ status: 'no' })
            }


        })


    }


})

router.post('/playprevious', function(req, res, next) {
    console.log('req.body.key', req.body.key)
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'play_prev', function(result) {
                    console.log(result)
                    if (result != false) {
                        res.send({ status: 'ok' })
                        res.end()

                    } else {
                        res.send({ status: 'no' })
                        res.end()
                    }


                })

            }

        })
        res.send({ status: 'no' })

    } else {
        fn.sendSocketToSpeaker(req.body.key, 'play_prev', function(result) {
            console.log(result)
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }

        })


    }


})

router.post('/playtrack', function(req, res, next) {
    console.log('req.body.key', req.body.key)
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'play', function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })
    } else {
        fn.sendSocketToSpeaker(req.body.key, 'play', function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})

router.post('/increasevolume', function(req, res, next) {
    console.log('req.body.key', req.body.key)
    valtoIncrease = req.body.nb
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'volume_increase:' + valtoIncrease, function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })

    } else {
        fn.sendSocketToSpeaker(req.body.key, 'volume_increase:' + valtoIncrease, function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})

router.post('/incrvolume', function(req, res, next) {
    console.log('req.body.key', req.body.key)

    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'volume_increase', function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })

    } else {
        fn.sendSocketToSpeaker(req.body.key, 'volume_increase', function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})
router.post('/decreasevolume', function(req, res, next) {
    valtoDecrease = req.body.nb
    console.log('req.body.key', req.body.key)
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'volume_decrease:' + valtoDecrease, function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })
    } else {
        fn.sendSocketToSpeaker(req.body.key, 'volume_decrease:' + valtoDecrease, function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})


router.post('/decrevolume', function(req, res, next) {

    console.log('req.body.key', req.body.key)
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'volume_decrease', function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })
    } else {
        fn.sendSocketToSpeaker(req.body.key, 'volume_decrease', function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})



router.post('/pause', function(req, res, next) {
    console.log('req.body.key', req.body.key)
    if (!req.body.key) {


        fn.clients.forEach(function(soc) {


            if (soc.linked == true) {

                fn.sendSocketToSpeaker(soc.name, 'pause_toggle', function(result) {
                    if (result != false) {
                        res.send({ status: 'ok' })
                    } else {
                        res.send({ status: 'no' })
                    }


                })

            }

        })
        res.send({ status: 'no' })

    } else {
        fn.sendSocketToSpeaker(req.body.key, 'pause_toggle', function(result) {
            if (result != false) {
                res.send({ status: 'ok' })
            } else {
                res.send({ status: 'no' })
            }


        })


    }


})




module.exports = router;