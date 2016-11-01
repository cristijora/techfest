/**
 * Created by cristian.jora on 28.09.2016.
 */
var Application =require('./models/application');
var guid =require('guid');
var bcrypt =require('bcrypt-nodejs');
var Emitter=require('events').EventEmitter;
var util=require('util');

var RegResult =function(){
    var result={
        success:false,
        message:null,
        user:null
    };
    return result;
};
var Registration = function(db){
    var self=this;
    Emitter.call(this);//pass this to event emitter so events can be used from this
    var continueWith=null;
    var validateInputs=function(app){
        if(!app.email || !app.password){
            app.setInvalid("Email and password are required");
            self.emit("invalid",app);
        }else if(app.password !==app.confirm){
            app.setInvalid("Passwords don't match");
            self.emit("invalid",app);
        }
        else{
            app.validate();
            self.emit("validated",app);
        }
    };

    var checkIfUserExists=function(app){
        var user=db.models.user;
        user.findOne({email:app.email},function(err,result){
          if(result){
              app.setInvalid('This email is already taken');
              self.emit('invalid',app)
          }else{
              self.emit('user-doesnt-exist',app)
          }
        })
    };

    var saveUser=function(app){
        var newGuid=guid.create().value;
        var UserModel=db.models.user;
        var user=new UserModel(app);
        user.id=newGuid;
        user.signInCount=1;
        user.hashedPassword=bcrypt.hashSync(app.password);
        user.settings=db.utils.userDefaultSettings;
        user.save(function(err,result){
          if(result){
              app.user=user;
              self.emit('user-created',app)
          }else{
              app.setInvalid('User could not be saved in db');
              self.emit('invalid',app)
          }
        })
    };

    var addLogEntry=function(app){
        console.log("User ID ",app.user);
        var LogModel=db.models.log;
        var log=new LogModel({
            subject:"Registration",
            userId:app.user.id,
            entry: "Successfully Registered"
        });
        log.id=guid.create().value;
        log.save(function(err,result){
           if(result){
               app.log=result;
               self.emit('log-created',app)
           }else{
               app.setInvalid('Log could not be saved in db');
               self.emit('invalid',app)
           }
        });
    };

    this.applyForMembership =function(args,next){
        continueWith=next;
        var app=new Application(args);
        if(app.isValid()){
            //success
        }
        self.emit('application-received',app)
    };

    var registrationSuccess=function(app){
        var regResult= new RegResult();
        regResult.success=true;
        regResult.message='Welcome!';
        regResult.user=app.user;
        regResult.log=app.log;
        self.emit('registered',regResult);
        if(continueWith){
            continueWith(null,regResult); //pass the callback further
        }
    };
    var registrationFail=function(app){
        var regResult= new RegResult();
        regResult.success=false;
        regResult.message=app.message;
        self.emit('not-register',regResult);
        if(continueWith){
            continueWith(null,regResult); //pass the callback further
        }
    };
    //listen to events
    this.on('application-received',validateInputs);
    this.on('validated',checkIfUserExists);
    this.on('user-doesnt-exist',saveUser);
    this.on('user-created',addLogEntry);
    this.on('log-created',registrationSuccess);

    this.on('invalid',registrationFail);

    return this;
};

util.inherits(Registration,Emitter);
module.exports=Registration;