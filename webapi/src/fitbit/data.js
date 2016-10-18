/**
 * Created by cristian.jora on 12.10.2016.
 */
var request = require('request');
function getActivity(access_token,activityType,successCallback,errorCallback){
    if(access_token){
        var headers = {
            'Authorization': `Bearer ${access_token}`
        };
        var options = {
            url: `https://api.fitbit.com/1/user/-/activities/${activityType}/date/today/1m.json`,
            method: 'GET',
            headers: headers,
        };
        request(options, function (error, response, body) {
            var responseBody=JSON.parse(body);
            if (!error && response.statusCode == 200) {
                // Print out the response body
                var property=`activities-${activityType}`
                successCallback(responseBody[property]);
            }

            else{
                errorCallback(responseBody)
            }
        });
    }
    else{
        errorCallback("No access token provided")
    }

}

module.exports=getActivity;