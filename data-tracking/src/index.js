/**
 * Created by cristian.jora on 30.10.2016.
 */
/**
 * Created by cristian.jora on 30.09.2016.
 */
var Emitter=require('events').EventEmitter;
var util=require('util');
var SettingsModule =require('./settings');
var MoodModule =require('./userMood');
var AbstractRepository =require('./abstractRepository');

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

    this.saveMood=function(args,next){
        var settings=new MoodModule(db);
        settings.on('mood-save-success',function(settingsResult){
            self.emit('mood-save-success',settingsResult)
        });
        settings.on('mood-save-fail',function(settingsResult){
            self.emit('mood-save-fail',settingsResult)
        });
        settings.saveMood(args,next)
    }

    this.getPagedMood=function(args,next){
        var settings=new MoodModule(db);

        settings.on('get-mood-success',function(settingsResult){
            self.emit('get-mood-success',settingsResult)
        });
        settings.on('get-mood-fail',function(settingsResult){
            self.emit('get-mood-fail',settingsResult)
        });
        settings.getPagedMood(args,next)
    }
    this.saveEntity=function(args,next){
        var repository=new AbstractRepository(db);
        validateRepository(args,repository,'save-data-success','save-data-fail',next);
        repository.saveEntity(args.model,next);
    }
    this.getOneEntity=function(args,next){
        var repository=new AbstractRepository(db);
        validateRepository(args,repository,'get-data-success','get-data-fail',next);
        repository.getOne(args.query,args.model,next)
    }

    this.getAllEntities=function(args,next){
        var repository=new AbstractRepository(db);
        validateRepository(args,repository,'get-data-success','get-data-fail',next);
        repository.getAll(args.query,args.model,next)
    }

    this.getPagedEntities=function(args,next){
        var repository=new AbstractRepository(db);
        validateRepository(args,repository,'get-data-success','get-data-fail',next);
        repository.getPagedData(args.query,args.model,args.page,next)
    }

    this.getWhereEntities=function(args,next){
        var repository=new AbstractRepository(db);
        validateRepository(args,repository,'get-data-success','get-data-fail',next);
        repository.getWhere(args.query,args.model,next)
    }

    function validateRepository(args,repository,successEventName,failEventName,next){
        var failResult={
            success:false,
            message:''
        }
        if(!args.query || !args.model){
            failResult.message="Arguments are invalid. Model or query is missing."
            next(failResult.message,failResult);
        }
        if(!successEventName || !failEventName){
            failResult.message="Internal server error upon database operation";
            next(failResult.message,failResult)
        }
        repository.on(successEventName,function(settingsResult){
            self.emit(successEventName,settingsResult)
        });
        repository.on(failEventName,function(settingsResult){
            self.emit(failEventName,settingsResult)
        });
    }

};

util.inherits(DataTracking,Emitter);
module.exports=DataTracking;