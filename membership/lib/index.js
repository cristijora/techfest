/**
 * Created by cristian.jora on 30.09.2016.
 */
var Emitter=require('events').EventEmitter;
var util=require('util');
var Authentication =require('./authentication');
var Registration =require('./registration');

var Membership = function(db){
    var self=this;
    Emitter.call(this);
    this.authenticate=function(email,password,next){
        var auth=new Authentication(db);
        auth.on('authenticated',function(authResult){
            self.emit('authenticated',authResult)
        });
        auth.on('not-authenticated',function(authResult){
            self.emit('not-authenticated',authResult)
        });
        auth.authenticate({email:email,password:password},next)
    };
    this.register=function(user,next){
        var reg=new Registration(db);
        reg.on('registered',function(authResult){
            self.emit('registered',authResult)
        });
        reg.on('not-registered',function(authResult){
            self.emit('not-registered',authResult)
        });
        reg.applyForMembership(user,next)
    }
};

util.inherits(Membership,Emitter);
module.exports=Membership;