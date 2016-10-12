var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/Fitbit';
// Use connect method to connect to the Server
var db = null;

function connect(successCallback, errorCallback) {
    MongoClient.connect(url, function (err, database) {
        if (err) {
            errorCallback(err);
        }
        successCallback(database);
    })
}

process.on('exit', function () {
    //clean up
    if (db) {
        db.close();
    }
});

module.exports = connect;
