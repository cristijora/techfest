'use strict';
var ObjectId = require('mongodb').ObjectID;
var getMail=require('./../assets/server')
module.exports = function (Payment) {
  var user=null,receiverUser = null
    Payment.sendEmail = function(payment,cb) {
      getMail(payment,function(html){
        Payment.app.models.Email.send({
          to: payment.sender.email,
          from: 'joracristi@gmail.com',
          subject: 'Techfest',
          text: 'my text',
          html: html
        }, function(err, mail) {
          console.log('email sent!');
          cb(err);
        });
      });
    }
  Payment.observe('before save', function updateBalances(ctx, next) {
    var appModels = ctx.Model.app.models;
    var customerModel = appModels.customer;
    var senderId = ctx.instance.senderId;
    var receiverId = ctx.instance.receiverId;
    if (!senderId || !receiverId) {
      return next(getError("No sender or receiver provided!"));
    }
    customerModel.findById(senderId, function (err, sender) {
      treatError(err,sender);
      findReceiverAndUpdateBalances(sender);
    });
    function findReceiverAndUpdateBalances(sender) {
      customerModel.findById(receiverId, function (err, receiver) {
        treatError(err,receiver)
        if(!receiver || !sender){
          return next(getError("No sender or receiver provided!"));
        }
        receiver.balance += ctx.instance.amount;
        sender.balance -= ctx.instance.amount;
        sender.save(function (err, result) {
          treatError(err,result)
          receiver.save(function (err, result) {
            treatError(err,result)
            user=sender;
            receiverUser=receiver;
            next();
          })
        })
      })
    }
    function treatError(err,result) {
      if (err) {
        return next(getError(err));
      }
      if(!result || result==null){
        return next(getError("Could find one or more entities"))
      }
    }
  });
  Payment.observe('after save',function updateBalances(ctx, next){
      var payment=JSON.parse(JSON.stringify(ctx.instance));
      ctx.instance.user=user;
      payment.sender=user;
      if(payment.products){
        var productModel=ctx.Model.app.models.product;
        var productIds = payment.products.map(function(idval) { return {id:idval}; });
        productModel.find({where:{or:productIds}},function(err,result){
          treatError(err,result);
          payment.products=result;
          payment.receiver=receiverUser;
          Payment.sendEmail(payment,function(err){
            console.log(err);
          });
          ctx.Model.app.io.emit("payment",payment);
        })
      }
      else{
        ctx.Model.app.io.emit("payment",payment);
      }
      next();

    function treatError(err,result) {
      if (err) {
        return next(getError(err));
      }
      if(!result || result==null){
        return next(getError("Could find one or more entities"))
      }
    }
  })
  function getError(message) {
    var err=new Error(message);
    err.status=400;
    return err;
  }
  Payment.afterRemote('find',function(ctx,result,next){
    console.log(result.length);
    var length=result.length;
    var nrOfCallbacks=0;
    if(length==0) next();
    result.forEach(function(payment){

      if(payment.products){
        var productModel=Payment.app.models.product;
        var productIds = payment.products.map(function(idval) { return {id:idval}; });
        productModel.find({where:{or:productIds}},function(err,products){
          nrOfCallbacks++;
          if(err){
            treatError(err,products);
          }
          payment.products=products;
          if(nrOfCallbacks==length){
            console.log("Done")
            next();
          }
        })
      }else{
        nrOfCallbacks++;
      }
      if(nrOfCallbacks==length){
        console.log("Done")
        next();
      }
    })
    function treatError(err,result) {
      if (err) {
        return next(getError(err));
      }
      if(!result || result==null){
        return next(getError("Could find one or more entities"))
      }
    }
  })
};
