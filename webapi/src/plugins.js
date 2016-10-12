/**
 * Created by cristian.jora on 12.10.2016.
 */
var bodyParser =require('body-parser');

function initAppPlugins(app){
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.json());
    app.listen(7000, function () {
        console.log("stareted on port 7000")
    });
}

module.exports=initAppPlugins;