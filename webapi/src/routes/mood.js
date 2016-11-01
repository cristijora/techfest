
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

router.get("/mood", function (req, res) {
    var userId=req.userId;
    if (!userId) {
        res.status(400).json({message:"User id is required"});
    }
    else{
        var args={
            userId:userId,
            page:req.query.page
        }
        dataTracking.getPagedMood(args,function (err, result) {
            if(result.success){
                res.status(200).json(result.results)
            }
            else{
                res.status(400).json(result.message);
            }
        });
    }
})

router.post("/mood/update", function (req, res) {
    if (!req.body.userId && !req.body.mood) {
        res.status(400).json({message:"User id and settings values are required!"});
    }
    else{
        dataTracking.saveMood(req.body,function (err, result) {
            if(result.success){
                res.status(200).json(result.mood)
            }
            else{
                res.status(400).json(result.message);
            }
        });
    }
});




module.exports = router;
