/**
 * Created by cecilia.man on 28.10.2016.
 */
var express = require('express');
var router = express.Router();
var db = null;

router.use(function (req, res, next) {
    db = req.db;
    next();
});
router.get("/users", function (req, res) {
    req.userId
    if (!db) res.status(400).json("Database error");
    db.collection("users").find().toArray(function (err, result) {
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json(result);
        }
    })
});

router.post("/setData", function(req,res)
{
    var body = req.body;
    console.log(body);
    if (!db) res.status(400).json("Database error");
    db.collection("users").findOneAndUpdate({username: "test2"},body,function(err,result){
        if(err) res.status(401).json(err);
        res.status(200).json(result);
    })
});
module.exports = router;