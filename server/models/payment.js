'use strict';

module.exports = function (Payment) {
  var user=null,receiver=null
  Payment.observe('before save', function updateBalances(ctx, next) {
    var appModels = ctx.Model.app.models;
    var customerModel = appModels.customer;
    var senderId = ctx.instance.senderId;
    var receiverId = ctx.instance.receiverId;
    if (!senderId || !receiverId) {
      console.log(ctx.res)
      next(getError("No sender or receiver provided!"));
    }
    customerModel.findById(senderId, function (err, sender) {
      treatError(err,sender);
      findReceiverAndUpdateBalances(sender);
    });
    function findReceiverAndUpdateBalances(sender) {
      customerModel.findById(receiverId, function (err, receiver) {
        treatError(err,receiver)
        receiver.balance -= ctx.instance.amount;
        sender.balance += ctx.instance.amount;
        sender.save(function (err, result) {
          treatError(err,result)
          receiver.save(function (err, result) {
            treatError(err,result)
            user=sender;
            receiver=receiver;
            next();
          })
        })
      })
    }
    function treatError(err,result) {
      if (err) {
        next(getError(err));
      }
      if(!result || result==null){
        next(getError("Could find one or more entities"))
      }
    }
    next();
  });
  Payment.observe('after save',function updateBalances(ctx, next){
      console.log(ctx.instance,"after saveeee");
      ctx.instance.user=user;
      next();
  })
  function getError(message) {
    var err = new Error(message);
    err.statusCode = 400;
    return err;
  }


};
