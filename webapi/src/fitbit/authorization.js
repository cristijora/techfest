/**
 * Created by cristian.jora on 12.10.2016.
 */
var auth_token=require('./credentials');
var request = require('request');
var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth_token}`
};

function authorizeToFitbit(code,successCallback,errorCallback){
    var options = {
        url: 'https://api.fitbit.com/oauth2/token',
        method: 'POST',
        headers: headers,
        form:{'code':code,'grant_type':'authorization_code','client_id':'22825F'}
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           /* // Print out the response body
            saveUser(res,req.body,body);*/
            successCallback(body);
        }
        else{
            console.log(body, "Error from fitbit");
            errorCallback(response,body);
           /* console.log(body, "Error from fitbit");
            var responseBody=JSON.parse(body);
            res.status(400).json(responseBody)*/
        }
    })
}

module.exports=authorizeToFitbit;