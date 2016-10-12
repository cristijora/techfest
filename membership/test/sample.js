/**
 * Created by cristian.jora on 28.09.2016.
 */
import should from 'should'
import User from './../lib/models/user'

describe('User',function(){
  describe('defaults',function(){
    var user={};
    before(function(){
      user=new User({email:"joracristi@gmail.com",username:"cristi"})
    });

    it("email is joracristi@gmail.com",function(){
      user.email.should.equal("joracristi@gmail.com")
    });
    /*it("has an authentication token",function(){
      user.authenticationToken.should.be.defined
    })*/
    it("has a created date",function(){
        user.createdAt.should.be.defined
    });
    it("has a signInCount of 0",function(){
        user.signInCount.should.equal(0)
    });
    it("has lastLogin",function(){
      user.lastLoginAt.should.be.defined
    });
    it("has a username",function(){
      user.username.should.be.defined
    })
  })
});