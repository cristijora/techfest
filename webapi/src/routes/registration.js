/**
 * Created by cristian.jora on 12.10.2016.
 */
var Membership = require('membership');
var authorizeToFitbit = require('./../fitbit/authorization');
var getHeartRates = require('./../fitbit/data');
function registerMembershipRoutes(app,db){
    app.post("/register", function (req, res) {
        var code = req.body.code;
        if (!code) {
            saveUser(res, req.body, null)
        }
        else {

            if (!req.body.email && !req.body.password && !req.body.confirm) {
                res.status(400).json("Email, password and confirm are mandatory");
            }
            else {
                authorizeToFitbit(code, function (body) {
                    saveUser(res, req.body, body);
                }, function (response, body) {
                    console.log(body, "Error from fitbit");
                    var responseBody = JSON.parse(body);
                    res.status(400).json(responseBody)
                })
            }
        }
    });

    function saveUser(res, requestBody, body) {
        if(!db) res.status(400).json("Database error");
        var membership = new Membership(db);
        var custom_data = JSON.parse(body);

        membership.register(requestBody.email, requestBody.password, requestBody.confirm, custom_data, (err, result)=> {
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

    app.post("/login", function (req, res) {
        var body = req.body;
        if(!db) res.status(400).json("Database error");
        if (body.email && body.password) {
            var membership = new Membership(db);
            membership.authenticate(body.email, body.password, function(err, result) {
                if (result.success ) {
                    if (result.user.custom_data) {
                        getHeartRates(result.user.custom_data.access_token, function (response) {
                            res.status(200).json(response);
                        }, function (response) {
                            res.status(400).json(response)
                        });
                    }
                    else {
                        res.status(200).json("User has no fitbit account linked");
                    }
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
}

module.exports=registerMembershipRoutes;
