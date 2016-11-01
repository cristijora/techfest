/**
 * Created by cristian.jora on 29.09.2016.
 */
import Registration from './../lib/registration'
import Authentication from './../lib/authentication'
var db = require('database')
var should = require('should')
describe('UserSettings',function(){
    var auth={};
    var reg={};
    var database=null;
    before(function(done){
        db.connect("mongodb://localhost:27017/testdb",function(err,result){
            if(err) {
                console.log("Error connecting to the database")
                done();
            }
            auth=new Authentication(db);
            reg=new Registration(db)
            database=db;
            done();
        });
    });

    after(function(done){
        db.disconnect();
        console.log("Db connection closed");
        done();
    })

    describe('a valid login',function(){
        var authResult={};
        before(function(done){
            auth.authenticate({email:"joracristi@gmail.com",password:"test"},function(err,result){
                authResult=result;
                done();
          })

        })
        it('is successful',function(){
            authResult.success.should.equal(true);
          //authResult.message.should.equal('Welcome!')
        })
        it('returns a user')
        it('creates a log entry')
        it('updates the signon dates')

    })

    describe('empty email',function(){
        it('is not successful')
        it("returns a message saying 'Invalid login!")
    })

    describe('empty password',function(){
        it('is not successful')
        it("returns a message saying 'Invalid login!")
    })

    describe("password doesn't match",function(){
        it('is not successful')
        it("returns a message saying 'Invalid login!")
    })

    describe('email not found',function(){
        it('is not successful')
        it("returns a message saying 'Invalid login!")
    })
})
