// /**
//  * Created by cristian.jora on 29.09.2016.
//  */
// import UserSettings from './../lib/authentication'
// import mongodb from 'mongodb'
// describe('UserSettings',function(){
//     var reg={};
//     var auth={};
//     var database=null;
//     before(function(done){
//         var MongoClient = mongodb.MongoClient;
//         var url = 'mongodb://localhost:27017/Fitbit';
//         MongoClient.connect(url, function(err, db) {
//             auth=new UserSettings(db);
//             database=db;
//             done();
//         });
//     })
//     after(function(done){
//       database.close();
//         done();
//     })
//     describe('a valid login',function(){
//         var authResult={};
//         before(function(done){
//             auth.authenticate({email:"joracristi@gmail.com",password:"test"},function(err,result){
//                 authResult=result;
//                 database.close();
//                     done();
//                 })
//
//         })
//         it('is successful',function(){
//             authResult.success.should.equal(true);
//           //authResult.message.should.equal('Welcome!')
//         })
//         it('returns a user')
//         it('creates a log entry')
//         it('updates the signon dates')
//
//     })
//
//     describe('empty email',function(){
//         it('is not successful')
//         it("returns a message saying 'Invalid login!")
//     })
//
//     describe('empty password',function(){
//         it('is not successful')
//         it("returns a message saying 'Invalid login!")
//     })
//
//     describe("password doesn't match",function(){
//         it('is not successful')
//         it("returns a message saying 'Invalid login!")
//     })
//
//     describe('email not found',function(){
//         it('is not successful')
//         it("returns a message saying 'Invalid login!")
//     })
// })