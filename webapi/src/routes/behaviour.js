/**
 * Created by cristian.jora on 31.10.2016.
 */
/**
 * Created by cristian.jora on 30.10.2016.
 */
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

router.get("/", function (req, res) {
    console.log(req.query);

    var userId=req.query.userId
    if (!userId) {
        res.status(400).json({message:"User id is required"});
    }
    else{
        var page=req.query.page?req.query.page:1;
        var args={
            query:{userId:userId},
            model:db.models.behaviour,
            page:page
        }
        dataTracking.getPagedEntities(args,function (err, result) {
            if(result.success){
                res.status(200).json(result.result)
            }
            else{
                res.status(400).json(result.message);
            }
        });
    }
})

router.post("/", function (req, res) {
    console.log(req.body);

    if (!req.body.userId && !req.body.behaviour) {
        res.status(400).json({message:"User id and behaviour values are required!"});
    }
    else{
        var model=req.db.models.behaviour;
        var behaviour=new model(req.body.behaviour);
        behaviour.userId=req.body.userId;
        var args={
            query:{},
            model:behaviour
        }
        dataTracking.saveEntity(args,function(err,result){
            if(err) res.status(400).json(err);
            else{
                if(!result.success){
                    res.status(400).json(result.message);
                }else{
                    res.status(200).json(result.result);
                }
            }
        })
    }
});

module.exports = router;
