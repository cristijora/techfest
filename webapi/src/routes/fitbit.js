/**
 * Created by cristian.jora on 13.10.2016.
 */
import getActivity from './../fitbit/data'
var express = require('express');
var router = express.Router();
var db = null;

const errors={
    NO_ENTITY_FOUND:'Could not find any user',
    NO_FITBIT_ACCOUNT:'User has not fitbit account linked',
    UNAUTHORIZED:"You are not authorized"
};
router.use(function (req, res, next) {
    db = req.db;
    next();
});
router.get("/fitbit/data", function (req, res) {
    var activityType = req.query.activity;
    var userId = req.query.userId;
    if (userId && activityType) {
        db.collection("users").findOne({id: userId}, function (err, result) {
            if (err || !result){
                return res.status(404).json(errors.NO_ENTITY_FOUND)
            }
            if (!result.custom_data || !result.custom_data.access_token){
                return res.status(400).json(errors.NO_FITBIT_ACCOUNT);
            }
            if (result.custom_data.access_token) {
                var token = result.custom_data.access_token;
                getActivity(token, activityType, (response)=> {
                    var output = response.map(function (obj) {
                        return parseResponse(obj);
                    });
                    res.status(200).json(output);
                }, (response)=> {
                    res.status(400).json(response.errors[0])
                })
            }
        })
    }
    else {
        return res.status(401).json(errors.UNAUTHORIZED)
    }
});

function parseResponse(obj) {
    return Object.keys(obj).sort().map(function (key) {
        if (key == "value") {
            if (typeof obj[key] == "string") { //get the value directly
                return parseFloat(obj[key]);
            } else {
                if (obj[key].restingHeartRate) {  //hear rate parsing
                    return parseInt(obj[key].restingHeartRate)
                }
            }
        }
        if (key == "dateTime") {
            var date = new Date(obj[key].split(' ').join('T'));
            return date.getTime()
        }
    });
}

module.exports = router;