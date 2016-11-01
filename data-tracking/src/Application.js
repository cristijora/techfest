/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 28.09.2016.
 */
var Application = function(args){

    var app={};
    app.userId=args.userId;
    app.mood=args.mood;
    app.settings=args.settings;
    app.user=null;
    app.status="pending";
    app.message=null;
    app.results=args.results;
    app.isValid=function(){
        return app.status=="validated"
    };

    app.isInvalid=function(){
        return !app.isValid();
    };

    app.setInvalid=function(message){
        app.status="invalid";
        app.message=message;
    };

    app.validate=()=>{
        app.status="validated";
    };
    return app;
};

module.exports=Application;