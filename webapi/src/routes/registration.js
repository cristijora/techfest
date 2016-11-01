/**
 * Created by cristian.jora on 12.10.2016.
 */

var express = require('express');
var router = express.Router();
var db=null;
//helpers
var Membership = require('membership');

router.use(function(req,res,next){
    db=req.db;
    next();
})

router.post("/register", function (req, res) {
    // var code = req.body.code;
    if (!req.body.email && !req.body.password && !req.body.confirm) {
        res.status(400).json("Email, password and confirm are mandatory");
    }
    saveUser(res, req.body)
});

router.post("/login", function (req, res) {
    var body = req.body;
    if (!db) res.status(400).json("Database error");
    if (body.email && body.password) {
        var membership = new Membership(db);
        membership.authenticate(body.email, body.password, function (err, result) {
            if (result.success) {
               res.status(200).json(result);
            }
            else {
                res.status(400).json(result);
            }
        })
    }
    else {
        res.status(400).json("No email or password provided");
    }
})
function saveUser(res, requestBody) {
    if (!db) res.status(400).json("Database error");
    var membership = new Membership(db);

    membership.register(requestBody, (err, result)=> {
        var response = {
            success: result.success,
            message: result.message
        };
        if (result.success) {
            res.status(200).json(response);
        }
        else {
            res.status(400).json(response);
        }
    })
}

module.exports = router;
