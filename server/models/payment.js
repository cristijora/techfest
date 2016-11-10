'use strict';

module.exports = function (Payment) {
  var user=null,receiver=null
  Payment.observe('before save', function updateBalances(ctx, next) {
    var appModels = ctx.Model.app.models;
    var customerModel = appModels.customer;
    var senderId = ctx.instance.senderId;
    var receiverId = ctx.instance.receiverId;
    if (!senderId || !receiverId) {
      next(getError("No sender or receiver provided!"));
    }
    customerModel.findById(senderId, function (err, sender) {
      if (err) {
        next(getError(err));
      }
      else {
        findReceiverAndUpdateBalances(sender);
      }
    })
    function findReceiverAndUpdateBalances(sender) {
      customerModel.findById(receiverId, function (err, receiver) {
        treatError(err)
        receiver.balance -= ctx.instance.amount;
        sender.balance += ctx.instance.amount;
        sender.save(function (err, result) {
          treatError(err)
          receiver.save(function (err, result) {
            treatError(err);
            user=sender;
            receiver=receiver;
            next();
          })
        })

      })
    }

    function treatError(err) {
      if (err) {
        next(getError(err));
      }
    }
  })
  Payment.observe('after save',function updateBalances(ctx, next){
      console.log(ctx.instance);
      ctx.instance.user=user;
      next();
  })
  function getError(message) {
    var err = new Error(message);
    err.statusCode = 400;
    return err;
  }


};
