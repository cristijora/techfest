var express = require('express');
var app = express();

//app middleware
var accessControlHeaders = require('./middleware/plugins').accessControlHeaders;
var logger = require('./middleware/logs/logger')
var bodyParser =require('body-parser');
var db = require('database')
db.connect("mongodb://localhost:27017/test");
//routes
var authRoutes =require('./routes/registration');
var userRoutes =require('./routes/settings');
var moodRoutes =require('./routes/mood');
var behaviourRoutes =require('./routes/behaviour');

//initialize app middleware. The argument functions will get executed before every request
app.use(bodyParser.json());
app.use(accessControlHeaders)
app.use(function(req,res,next){
    req.db=db;
    next();
});
app.use(logger);

//Initialize server. This is binded to http://kairyapi.corebuild.eu
app.listen(8082, function () {
    console.log("stareted on port 8082")
});

app.use(authRoutes)
app.use("/user",userRoutes)
app.use("/user",moodRoutes)
app.use("/behaviour",behaviourRoutes)

app.get("/", function (req, res) {
    res.status(200).json("Hello");
});
