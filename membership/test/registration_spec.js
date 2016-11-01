/**
 * Created by cristian.jora on 28.09.2016.
 */
import Registration from './../lib/registration'
var db = require('database')
var should = require('should')
var mongoose = require('mongoose');
describe("SettingsModule",function(){
   var reg={};
   var database=null;
   before(function(done){
       db.connect("mongodb://localhost:27017/testdb",function(err,result){
           if(err) {
               console.log("Error connecting to the database")
               done();
           }
           reg=new Registration(db)
           database=db;
           done();
       });
   });

   after(function(done){
       db.models.user.remove({},function(err){
           console.log("User collection dropped");
       })
       db.disconnect();
       console.log("Db connection closed");
       done();
   })

  describe('a valid application',function(){
    var regResult={};
    before(function(done){
        var user={email:"joracristi6@gmail.com",username:"test",password:"test",confirm:"test",custom_data:"some custom data",settings:{x:"1"}};
        reg.applyForMembership(user,function(err,result){
          regResult=result;
          done();
        })
    });

    it('is successful',function(){
        regResult.success.should.equal(true);
    });
    it('creates a user',function(){
      regResult.user.should.be.defined;
    });
    it('creates a log entry',function(){
        regResult.log.should.be.defined;
    });
    it('offers a welcome message',function(){
     regResult.message.should.equal("Welcome!")
    });
     it("increments signInCount",function(){
       regResult.user.should.be.defined;
       regResult.user.signInCount.should.equal(1)
     })
  });

    describe('an empty or null email',function(){
        var regResult={};
        before(function(done){
            var user={username:"test",password:"test",confirm:"test",custom_data:"some custom data",settings:{x:"1"}};
            reg.applyForMembership(user,function(err,result){
                regResult=result;
                done();
            })
        });
        it('is not successful',function(){
            regResult.success.should.equal(false);
        });
        it('tells the user that email is required')
    });

    describe('empty or null password',function(){
        var regResult={};
        before(function(done){
            var user={email:"test@test.com",username:"test",confirm:"test",custom_data:"some custom data",settings:{x:"1"}};
            reg.applyForMembership(user,function(err,result){
                regResult=result;
                done();
            })
        });
        it('is not successful',function(){

            regResult.success.should.equal(true);
        });
        it('tells the user that password is required')
    });

    describe('password and confirm mismatch',function(){
        it('is not successful');
        it('tells the user that password and confirm mismatch')
    });

    describe('email already exists',function(){
        var regResult={};
        before(function(done){
            reg.applyForMembership({email:"test2@gmail.com",username:"test",password:"test",confirm:"test"},function(err,result){
                reg.applyForMembership({email:"test2@gmail.com",username:"test",password:"test",confirm:"test"},function(err,result){
                    regResult=result;
                    done();
                })
            })
        })
        it('is not successful',function(){
          regResult.success.should.equal(false);
        })
        it('tells the user that email already exists',function(){
            regResult.success.should.equal(false);
            regResult.message.should.equal('This email is already taken');
        })
    })
});