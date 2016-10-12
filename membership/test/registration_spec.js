/**
 * Created by cristian.jora on 28.09.2016.
 */
import Registration from './../lib/registration'
import mongodb from 'mongodb'
describe("Registration",function(){
   var reg={};
   var database=null;
   before(function(done){
       var MongoClient = mongodb.MongoClient;
       var url = 'mongodb://localhost:27017/Fitbit';
       MongoClient.connect(url, function(err, db) {
           reg=new Registration(db);
           database=db;
           done();
       });
   });

    after(function(done){
        database.close();
        done();
    });

  describe('a valid application',function(){
    var regResult={};
    before(function(done){
        reg.applyForMembership({email:"joracristic@gmail.com",password:"test",confirm:"test",custom_data:"some custom data"},function(err,result){
          regResult=result;
            database.close();
          done();
        })
    });

    it('is successful',function(){
        console.log(regResult.success," Result in is succesfull method");
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
        it('is not successful');
        it('tells the user that email is required')
    });

    describe('empty or null password',function(){
        it('is not successful');
        it('tells the user that password is required')
    });

    describe('password and confirm mismatch',function(){
        it('is not successful');
        it('tells the user that password and confirm mismatch')
    });

    /*describe('email already exists',function(){
        var regResult={};
        before(function(done){
            reg.applyForMembership({email:"test2@gmail.com",password:"test",confirm:"test"},function(err,result){
                regResult=result;
                done();
            })
        })
        it('is not successful',function(){
          regResult.success.should.equal(false);
        })
        it('tells the user that email already exists',function(){
            regResult.success.should.equal(false);
            regResult.message.should.equal('This email is already taken');
        })
    })*/
});