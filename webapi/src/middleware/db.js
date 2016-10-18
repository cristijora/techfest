var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017/Fitbit';
// Use connect method to connect to the Server
var db = null;

process.on('exit', function () {
    //Clean up. Close database upon server restart or crash
    if (db) {
        db.close();
    }
});
function connect(successCallback, errorCallback) {
    MongoClient.connect(url, function (err, database) {
        if (err) {
            errorCallback(err);
        }
        successCallback(database);
    })
}

module.exports = {
    //Middleware to attach database to request
    database: function (req, res, next) {
        if (db) {
            req.db = db;
            next();
        }
        else {
            connect(function (database) {
                req.db = database;
                next();
            }, function (err) {
                console.log(err)
                req.db = null;
                next();
            })
        }
    }
};
