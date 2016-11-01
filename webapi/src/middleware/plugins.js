/**
 * Created by cristian.jora on 12.10.2016.
 */
var url = require('url') ;
var jwt = require('jsonwebtoken')
var accessControlHeaders=function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

var base_url=function(req,res,next){
    var hostname = req.headers.host; // hostname = 'localhost:8080'
    var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
    var base_url='http://' + hostname + pathname;
    req.base_url=base_url;
    next();
}

var tokenVerification=function(req,res,next){
    var token = req.headers['authorization'];
    if(token){
        jwt.verify(token,"test", function(err, decoded){
            if(err){
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token '
                });
            }
            else{
                req.decoded = decoded;
                req.userId=decoded.id;
                next();
            }
        })
    }
    else{
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}
module.exports={
    accessControlHeaders,
    base_url,
    tokenVerification
};


