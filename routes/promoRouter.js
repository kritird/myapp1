var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();
    
var Promotions = require('../models/promotions');
    
router.use(bodyParser.json());

router.route('/')

.get(function(req,res,next){

    Promotions.find({}, function(err, promotion){
        if(err) next(err);
        res.json(promotion);
    });
})

.post(function(req, res, next){

    Promotions.create(req.body, function(err, promotion){
        if(err) next(err);
        
        console.log('Promotion Created!');
        var id = promotion._id;
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.end('Added the promotion with id: ' + id);
    });
})

.delete(function(req, res, next){
    
    Promotions.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

router.route('/:id')

.get(function(req,res,next){

    Promotions.findById(req.params.id, function(err, promotion){
        if(err) next(err);
        res.json(promotion);   
    });
})

.put(function(req, res, next){

    Promotions.findByIdAndUpdate(req.params.id, 
                            {$set : req.body},
                            {new:true},
                            function(err,promotion){
                                if (err) next(err);
                                res.json(promotion);
    });
})

.delete(function(req, res, next){
    
    Promotions.findByIdAndRemove(req.params.id, 
            function (err, resp) {        
                if (err) next(err);
                res.json(resp);
    });
});
    

module.exports = router;
