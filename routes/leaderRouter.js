var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();
    
var Leaders = require('../models/leadership');
    
router.use(bodyParser.json());

router.route('/')

.get(function(req,res,next){

    Leaders.find({}, function(err, leader){
        if(err) next(err);
        res.json(leader);
    });
})

.post(function(req, res, next){

    Leaders.create(req.body, function(err, leader){
        if(err) next(err);
        
        console.log('Leader Created!');
        var id = leader._id;
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end('Added the leader with id: ' + id);
    });
})

.delete(function(req, res, next){
    
    Leaders.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

router.route('/:id')

.get(function(req,res,next){

    Leaders.findById(req.params.id, function(err, leader){
        if(err) next(err);
        res.json(leader);   
    });
})

.put(function(req, res, next){

    Leaders.findByIdAndUpdate(req.params.id, 
                            {$set : req.body},
                            {new:true},
                            function(err,leader){
                                if (err) next(err);
                                res.json(leader);
    });
})

.delete(function(req, res, next){
    
    Leaders.findByIdAndRemove(req.params.id, 
            function (err, resp) {        
                if (err) next(err);
                res.json(resp);
    });
});
    

module.exports = router;
