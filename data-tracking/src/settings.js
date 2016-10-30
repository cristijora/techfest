/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 29.09.2016.
 */
var Emitter=require('events').EventEmitter;
var util=require('util');
var uuid = require('uuid')
var Application = require('./Application')
var SettingsResult=function(){
    var result={
        success:false,
        message:"Could not save user settings",
        user:null,
        log:null
    };
    return result;
};
var UserSettings = function(db){
    var self=this;
    Emitter.call(this); //pass this to event emitter so events can be used from this
    var continueWith=null;
    var userModel=db.models.user;

    var validateSettings=function(app){
        if(app.settings && app.userId){
            self.emit("settings-ok",app)
        }
        else{
            app.setInvalid("Invalid settings or userId is not present")
            self.emit('invalid',app)
        }
    }

    var updateUserSettings=function(app){
        userModel.findOneAndUpdate({id:app.userId},{$set:{settings:app.settings}},{new:true},function(err,result){
            if(err || !result){
                app.setInvalid("Could not find the user in the database")
                self.emit("invalid",app);
            }else{
                app.user=result;
                self.emit("user-settings-saved",app);
            }
        })
    }
    var addLogEntry=function(app){
        var LogModel=db.models.log;
        var log=new LogModel({
            subject:"Update user settings",
            userId:app.userId,
            entry: "Successfully updated user settings"
        });
        log.id=uuid.v1();
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
    var updateSettingsSuccess=function(app){
        var settingsResult=new SettingsResult();

        settingsResult.success=true;
        settingsResult.message="Updated user settings";
        settingsResult.user=app.user;
        settingsResult.log=app.log;
        self.emit('settings-save-success',settingsResult);
        self.emit('completed',settingsResult);

        if(continueWith){
            continueWith(null,settingsResult)
        }
    };

    var updateSettingsFailed=function(app){
        var settingsResult=new SettingsResult();

        settingsResult.success=false;
        settingsResult.message=app.message;

        self.emit('settings-save-fail',settingsResult);
        self.emit('completed',settingsResult);
        if(continueWith){
            continueWith(null,settingsResult)
        }
    };
    //happy
    this.on('settings-received',validateSettings);
    this.on('settings-ok',updateUserSettings);
    this.on('user-settings-saved',addLogEntry);
    this.on('log-created',updateSettingsSuccess);

    //sad
    this.on('invalid',updateSettingsFailed);

    this.updateSettings=function(args,next){
        continueWith=next;
        var app=new Application(args);
        this.emit('settings-received',app)
    };

    var getSettingsSuccess=function(app){
        var settingsResult=new SettingsResult();

        settingsResult.success=true;
        settingsResult.message="Get user settings successful";
        settingsResult.user=app.user;
        self.emit('get-settings-success',settingsResult);
        self.emit('completed',settingsResult);

        if(continueWith){
            continueWith(null,settingsResult)
        }
    }
    var getUserSettingsFail=function(app){
        var settingsResult=new SettingsResult();
        settingsResult.success=false;
        settingsResult.message=app.message;
        self.emit('get-settings-fail',settingsResult);
        self.emit('completed',settingsResult);
        if(continueWith){
            continueWith(null,settingsResult)
        }
    }
    this.getUserSettings=function(userId,next){
        continueWith=next;
        var app=new Application({userId:userId});
        if(!userId){
            app.setInvalid("User id is missing");
            getUserSettingsFail(app);
        }
        userModel.findOne({id:userId},function(err,result){

            if(err || !result){
                getUserSettingsFail(app);
            }
            else{
                app.user=result;
                getSettingsSuccess(app);
            }
        })
    }
    return this;
};

util.inherits(UserSettings,Emitter);
module.exports=UserSettings;

