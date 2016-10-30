/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 12.10.2016.
 */
var express = require('express');
var router = express.Router();
var db=null;
//helpers
var DataTracking = require('data-tracking');
var dataTracking=null;

router.use(function(req,res,next){
    db=req.db;
    dataTracking=new DataTracking(db);
    next();
})

router.get("/settings", function (req, res) {
    var userId=req.query.userId
    if (!userId) {
        res.status(400).json({message:"User id is required"});
    }
    else{
        dataTracking.getUserSettings(userId,function (err, result) {
            if(result.success){
                res.status(200).json(result.user)
            }
            else{
                res.status(400).json(result.message);
            }
        });
    }
})

router.post("/settings/update", function (req, res) {
    if (!req.body.userId && !req.body.settings) {
        res.status(400).json({message:"User id and settings values are required!"});
    }
    else{
        dataTracking.updateSettings(req.body,function (err, result) {
            if(result.success){
                res.status(200).json(result.user.settings)
            }
            else{
                res.status(400).json(result.message);
            }
        });
    }
});




module.exports = router;
