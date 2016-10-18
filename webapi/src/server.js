var express = require('express');
var app = express();

//app middleware
var accessControlHeaders = require('./middleware/plugins').accessControlHeaders;
var logger = require('./middleware/logs/logger')
var bodyParser =require('body-parser');
var db =require('./middleware/db').database;

//routes
var authRoutes =require('./routes/registration');
var fitbitRoutes =require('./routes/fitbit');

//initialize app middleware. The argument functions will get executed before every request
app.use(bodyParser.json());
app.use(accessControlHeaders)
app.use(db);
app.use(logger);

//Initialize server. This is binded to http://kairyapi.corebuild.eu
app.listen(8082, function () {
    console.log("stareted on port 8082")
});

app.use(authRoutes)
app.use(fitbitRoutes)

app.get("/", function (req, res) {
    res.status(200).json("Hello")
});




