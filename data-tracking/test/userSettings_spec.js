/**
 * Created by cristian.jora on 28.09.2016.
 */
var UserSettings = require('./../src/settings')
var should = require('should')
var db = require('database')
describe("User settings",function(){
  var userSettings={};
  var database=null;
  before(function(done){
    db.connect("mongodb://localhost:27017/testdb",function(err,result){
      if(err) {
        console.log("Error connecting to the database")
      }
      userSettings=new UserSettings(db);
      database=db;
      done();
    });
  });

  after(function(done){
    db.disconnect();
    console.log("Db connection closed");
    done();
  })

  describe('update user settings',function(){
    var settingsResult={};
    before(function(done){
      var args={userId:"e821e091-642a-c3d4-38a6-f134ebed7031",settings:{set1:"test3",set2:"test2"}}
      userSettings.updateSettings(args,function(err,result){
        settingsResult=result;
        done();
      })
    });

    it("is successful",function(){
      settingsResult.should.be.defined;
      settingsResult.success.should.equal(true);
    })
    it("contains the user entity",function(){
      settingsResult.user.should.be.defined;
      settingsResult.user.id.should.be.defined;
    })
    it("adds a log entry",function(){
      settingsResult.log.should.be.defined;
    })
            

  });
  describe('try to update settings of a user that does not exist',function(){
    var settingsResult={};
    before(function(done){
      var args={userId:"incorrect_id",settings:{set1:"test3",set2:"test2"}}
      userSettings.updateSettings(args,function(err,result){
        settingsResult=result;
        done();
      })
    });
    it("is not successful",function(){
      settingsResult.success.should.equal(false);
    })
        
  })

  describe('get user settings',function(){
    var settingsResult={};
    before(function(done){
      var userId="e821e091-642a-c3d4-38a6-f134ebed7031";
      userSettings.getUserSettings(userId,function(err,result){
        settingsResult=result;
        done();
      })
    });

    it("is sucessful",function(){
      settingsResult.success.should.equal(true);
      settingsResult.user.should.be.defined;
    })
  })

});