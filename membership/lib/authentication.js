/**
 * Created by cristian.jora on 29.09.2016.
 */
var Emitter=require('events').EventEmitter;
var util=require('util');
var bcrypt= require('bcrypt-nodejs');
var guid= require('guid');

var AuthResult=function(creds){
    var result={
        creds:creds,
        success:false,
        message:"Invalid username or password",
        user:null,
        log:null
    };
    return result;
};
var Authentication = function(db){
    var self=this;
    Emitter.call(this); //pass this to event emitter so events can be used from this
    var continueWith=null;

    //validate credentials
    var validateCredentials=function(authResult){
        if(authResult.creds.email && authResult.creds.password){
            self.emit('creds-ok',authResult);
      }
      else{
            self.emit('invalid',authResult)
      }
    };
    //find user
    var findUser=function(authResult){
        var UserModel=db.models.user;
        UserModel.findOne({email:authResult.creds.email},function(err,result){
          if(result){
              authResult.user=new UserModel(result);
              self.emit('user-found',authResult)
          }
          else{
              self.emit('invalid',authResult)
          }
        })
    };
    //compare passwords
    var comparePassword=function(authResult){
        var matched=bcrypt.compareSync(authResult.creds.password,authResult.user.hashedPassword);
        if(matched){
            self.emit('password-accepted',authResult)
        }else{
            self.emit('invalid',authResult)
        }
    };
    //bump the stats
    var updateUserStats=function(authResult){
      var user=authResult.user;
        user.signInCount+=1;
        user.lastLoginAt=new Date();
        var updates={
            signInCount:user.signInCount,
            lastLoginAt:user.lastLoginAt
        };
        //TODO update stats
        self.emit('stats-updated',authResult)

    };

    var addLogEntry=function(authResult){
        var LogModel=db.models.log;
        var log=new LogModel({
            subject:"Authentication",
            entry: "Successfully logged in",
            userId:authResult.user.id,
        });
        log.id=guid.create().value;
        log.save(function(err,result){
            if(result){
                authResult.log=result;
                self.emit('log-created',authResult)
            }else{
                authResult.setInvalid('Log could not be saved in db');
                self.emit('invalid',authResult)
            }
        });
    };
    var loginSuccess=function(authResult){
        authResult.success=true;
        authResult.message="Welcome!";
        self.emit('authenticated',authResult);
        self.emit('completed',authResult);
        if(continueWith){
            var response={
                success:authResult.success,
                message:authResult.message,
                user:{
                    custom_data:authResult.user.custom_data,
                    userId:authResult.user.id
                }
            }
            continueWith(null,response)
        }
    };

    var loginFail=function(authResult){
        authResult.success=false;
        authResult.message=authResult.message;
        self.emit('not-authenticated',authResult);
        self.emit('completed',authResult);
        if(continueWith){
            var response={
                success:authResult.success,
                message:authResult.message,

            }
            continueWith(null,response)
        }
    };
    //happy
    this.on('login-received',validateCredentials);
    this.on('creds-ok',findUser);
    this.on('user-found',comparePassword);
    this.on('password-accepted',updateUserStats);
    this.on('stats-updated',addLogEntry);
    this.on('log-created',loginSuccess);

    //sad
    this.on('invalid',loginFail);
    this.authenticate=function(creds,next){
        continueWith=next;
        var authResult=new AuthResult(creds);
        this.emit('login-received',authResult)
    };
    return this;
};

util.inherits(Authentication,Emitter);
module.exports=Authentication;

