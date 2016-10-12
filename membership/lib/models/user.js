/**
 * Created by cristian.jora on 28.09.2016.
 */
var assert =require('assert');
var User = function(args){
    assert.ok(args.email,"Email is required");

    var user={};
    user.id=args.id;
    user.email=args.email;
    user.username=args.username;
    user.password=args.password;
    user.createdAt=args.createdAt || new Date();
    user.signInCount=args.signInCount || 0;
    user.lastLoginAt=args.lastLoginAt || new Date();
    user.authenticationToken=args.authenticationToken || null;
    user.hashedPassword=args.hashedPassword || null;
    user.custom_data=args.custom_data ||null;
    return user;

};

module.exports=User;

