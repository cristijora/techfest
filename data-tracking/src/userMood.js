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
var MoodResult=function(){
    var result={
        success:false,
        message:"Could not save mood data",
        results:null,
        total:0,
        log:null
    };
    return result;
};
var Mood = function(db){
    var self=this;
    Emitter.call(this); //pass this to event emitter so events can be used from this
    var continueWith=null;
    var moodModel=db.models.mood;

    var validateSettings=function(app){

        if(app.mood && app.userId){
            self.emit("data-ok",app)
        }
        else{
            console.log(app);

            app.setInvalid("Invalid data or userId is not present")
            self.emit('invalid',app)
        }
    }

   var saveMood=function(app){
       var mood=new moodModel();
       mood.createdAt=new Date();
       mood.mood_type=app.mood.mood_type;
       mood.id=uuid.v1();
       mood.userId=app.userId;

       mood.save(function(err,result){
           if(err || !result){
               app.setInvalid(err)
               self.emit('invalid',app);
           }else{
               app.mood=result;
               self.emit('save-successful',app);
           }
       })
   }
    var addLogEntry=function(app){
        var LogModel=db.models.log;
        var log=new LogModel({
            subject:"Add user mood",
            userId:app.userId,
            entry: "Successfully added user mood data"
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
    var saveMoodSuccess=function(app){
        var settingsResult=new MoodResult();

        settingsResult.success=true;
        settingsResult.message="Updated mood data";
        settingsResult.mood=app.mood;
        settingsResult.log=app.log;

        self.emit('mood-save-success',settingsResult);
        self.emit('completed',settingsResult);

        if(continueWith){
            continueWith(null,settingsResult)
        }
    };

    var saveMoodFail=function(app){
        var settingsResult=new MoodResult();

        settingsResult.success=false;
        settingsResult.message=app.message;

        self.emit('mood-save-fail',settingsResult);
        self.emit('completed',settingsResult);
        if(continueWith){
            continueWith(null,settingsResult)
        }
    };
    //happy
    this.on('data-received',validateSettings);
    this.on('data-ok',saveMood);
    this.on('save-successful',addLogEntry);
    this.on('log-created',saveMoodSuccess);

    //sad
    this.on('invalid',saveMoodFail);

    this.saveMood=function(args,next){
        continueWith=next;
        var app=new Application(args);
        this.emit('data-received',app)
    };

    var getPagedMoodSuccess=function(app){
        var moodResult=new MoodResult();

        moodResult.success=true;
        moodResult.message="Successfully retrieved mood data";
        moodResult.results=app.results;
        moodResult.total=app.total;
        self.emit('get-mood-success',moodResult);
        self.emit('completed',moodResult);

        if(continueWith){
            continueWith(null,moodResult)
        }
    }
    var getPagedMoodFail=function(app){
        var moodResult=new MoodResult();
        moodResult.success=false;
        moodResult.message=app.message;
        self.emit('get-mood-fail',moodResult);
        self.emit('completed',moodResult);
        if(continueWith){
            continueWith(null,moodResult)
        }
    }
    this.getPagedMood=function(args, next){
        continueWith=next;
        var page=args.page;
        if(!page)page=1;
        var app=new Application(args);
        if(!args.userId){
            app.setInvalid("User id is missing");
            getPagedMoodFail(app);
        }
        moodModel.paginate({userId:args.userId},{page:page,limit:10},function(err,result){
            console.log(result);

            if(err || !result){
                getPagedMoodFail(app);
            }
            else{
                app.results=result.docs;
                app.total=result.total;
                getPagedMoodSuccess(app);
            }
        })
    }
    return this;
};

util.inherits(Mood,Emitter);
module.exports=Mood;

