/**
 * Created by cristian.jora on 31.10.2016.
 */
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
var Result=function(){
    var result={
        success:false,
        message:"Could not save user settings",
        result:null,
        log:null
    };
    return result;
};
var AbstractRepository = function(db){
    var self=this;
    Emitter.call(this); //pass this to event emitter so events can be used from this
    var continueWith=null;

    var saveEntity=function(app){
        var entity=app.entity;
        entity.createdAt=new Date();
        entity.id=uuid.v1();

        entity.save(function(err,result){
            if(err || !result){
                app.setInvalid(err)
                self.emit('invalid',app);
            }else{
                app.entity=result;
                self.emit('save-success',app);
            }
        })
    }

    var saveEntitySuccess=function(app){
        var result=new Result();

        result.success=true;
        result.message="Updated mood data";
        result.result=app.entity;
        self.emit('data-save-success',result);
        self.emit('completed',result);
        if(continueWith){
            continueWith(null,result)
        }
    }

    var saveEntityFail=function(app){
        var result=new Result();

        result.success=false;
        result.message=app.message;

        self.emit('data-save-fail',result);
        self.emit('completed',result);
        if(continueWith){
            continueWith(null,result)
        }
    }
    //happy
    this.on('data-received',saveEntity);
    this.on('save-success',saveEntitySuccess);

    //sad
    this.on('invalid',saveEntityFail);

    this.saveEntity=function(modelToSave,next){
        var app=new Application(modelToSave);
        if (modelToSave.constructor.name != 'model') {
            app.setInvalid("Entity is not a model instance");
        }
        app.entity=modelToSave
        continueWith=next;
        this.emit('data-received',app)
    };


    var getDataSuccess=function(app){
        var result=new Result();

        result.success=true;
        result.message="Get user settings successful";
        result.result=app.result;
        self.emit('get-data-success',result);
        self.emit('completed',result);

        if(continueWith){
            continueWith(null,result)
        }
    }
    var getDataFail=function(app){
        var settingsResult=new Result();
        settingsResult.success=false;
        settingsResult.message=app.message;
        self.emit('get-data-fail',settingsResult);
        self.emit('completed',settingsResult);
        if(continueWith){
            continueWith(null,settingsResult)
        }
    }
    this.getOne=function(query,model, next){
        var app=new Application(query);
        continueWith=next;
        if (model.constructor.name != 'model') {
            app.setInvalid("Entity is not a model instance");
        }
        if(!query){
            app.setInvalid("Query is missing");
            getDataFail(app);
        }
        model.findOne(query,function(err,result){
            if(err || !result){
                getDataFail(app);
            }
            else{
                app.result=result;
                getDataSuccess(app);
            }
        })
    }

    this.getAll=function(query,model, next){
        var app=new Application(query);
        continueWith=next;
        if (model.constructor.name != 'model') {
            app.setInvalid("Entity is not a model instance");
        }
        model.find(function(err,result){
            if(err || !result){
                getDataFail(app);
            }
            else{
                app.result=result;
                getDataSuccess(app);
            }
        })
    }

    this.getWhere=function(query,model, next){
        var app=new Application(query);
        continueWith=next;
        if (model.constructor.name != 'model') {
            app.setInvalid("Entity is not a model instance");
        }
        model.find(query,function(err,result){
            if(err || !result){
                getDataFail(app);
            }
            else{
                app.result=result;
                getDataSuccess(app);
            }
        })
    }
    this.getPagedData=function(query,model,page, next){
        var app=new Application(query);
        continueWith=next;
        if (model.constructor.name != 'model') {
            app.setInvalid("Entity is not a model instance");
        }
        if(!page){
            page=1
        }
        model.paginate(query,{page:page,limit:5},function(err,result){
            if(err || !result){
                getDataFail(app);
            }
            else{
                app.result=result;
                getDataSuccess(app);
            }
        })
    }
    return this;
};

util.inherits(AbstractRepository,Emitter);
module.exports=AbstractRepository;

