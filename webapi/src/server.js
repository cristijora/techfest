var express = require('express');
var app = express();
var cors=require('cors');
//app middleware
var accessControlHeaders = require('./middleware/plugins').accessControlHeaders;
var base_url = require('./middleware/plugins').base_url;
var tokenVerification = require('./middleware/plugins').tokenVerification;
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
app.use(base_url)
app.use(function(req,res,next){
    if(db.error) return res.status(500).json(db.error)
    req.db=db;
    next();
});
app.use(logger);
app.use(cors())

//Initialize server. This is binded to http://kairyapi.corebuild.eu
app.listen(8082, function () {
    console.log("stareted on port 8082")
});
app.get("/", function (req, res) {
    res.status(200).json("Hello");
});

app.use(authRoutes);
app.use(tokenVerification);

app.use("/user",userRoutes)
app.use("/user",moodRoutes)
app.use("/behaviour",behaviourRoutes)

