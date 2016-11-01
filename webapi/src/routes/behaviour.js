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
var db = null;
//helpers
var DataTracking = require('data-tracking');
var dataTracking = null;
require('url')

router.use(function (req, res, next) {
    db = req.db;
    dataTracking = new DataTracking(db);
    next();
})

router.get("/", function (req, res) {
    var userId = req.userId

    var page = req.query.page ? req.query.page : 1;
    var args = {
        query: {userId: userId},
        model: db.models.behaviour,
        page: page
    }
    dataTracking.getPagedEntities(args, function (err, result) {
        if (result.success) {
            page = parseInt(page);
            var next_page = page < result.result.total_pages ? (page + 1) : page;
            var prev_page = page <= 1 ? result.result.total_pages : page - 1;
            result.result.prev_page_url = req.base_url + '?userId=' + userId + '&page=' + prev_page;
            result.result.next_page_url = req.base_url + '?userId=' + userId + '&page=' + next_page;
            res.status(200).json(result.result)
        }
        else {
            res.status(400).json(result.message);
        }
    });

})

router.post("/", function (req, res) {
    if (!req.body.behaviour) {
        res.status(400).json({message: "Behaviour values are required!"});
    }
    else {
        var model = req.db.models.behaviour;
        var behaviour = new model(req.body.behaviour);
        behaviour.userId = req.body.userId;
        var args = {
            query: {},
            model: behaviour
        }
        dataTracking.saveEntity(args, function (err, result) {
            if (err) res.status(400).json(err);
            else {
                if (!result.success) {
                    res.status(400).json(result.message);
                } else {

                    res.status(200).json(result);
                }
            }
        })
    }
});

module.exports = router;
