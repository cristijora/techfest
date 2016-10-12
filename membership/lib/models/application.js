/**
 * Created by cristian.jora on 28.09.2016.
 */
var Application = function(args){

    var app={};
    app.email=args.email;
    app.username=args.username;
    app.password=args.password;
    app.confirm=args.confirm;
    app.custom_data=args.custom_data;
    app.status="pending";
    app.message=null;
    app.user=null;
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