/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 30.09.2016.
 */
var Emitter=require('events').EventEmitter;
var util=require('util');
var SettingsModule =require('./settings');

var DataTracking = function(db){
    var self=this;
    Emitter.call(this);

    this.updateSettings=function(args,next){
        var settings=new SettingsModule(db);
        settings.on('settings-save-success',function(settingsResult){
            self.emit('settings-save-success',settingsResult)
        });
        settings.on('settings-save-fail',function(settingsResult){
            self.emit('settings-save-fail',settingsResult)
        });
        settings.updateSettings(args,next)
    }

    this.getUserSettings=function(userId,next){
        var settings=new SettingsModule(db);
        settings.on('get-settings-success',function(settingsResult){
            self.emit('get-settings-success',settingsResult)
        });
        settings.on('get-settings-fail',function(settingsResult){
            self.emit('get-settings-fail',settingsResult)
        });
        settings.getUserSettings(userId,next)
    }
};

util.inherits(DataTracking,Emitter);
module.exports=DataTracking;