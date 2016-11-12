'use strict';

module.exports = function (Payment) {
  var user=null,receiver=null
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
        return next(getError(err));
      }
      if(!result || result==null){
        return next(getError("Could find one or more entities"))
      }
    }
  });
  Payment.observe('after save',function updateBalances(ctx, next){
      var payment=JSON.parse(JSON.stringify(ctx.instance));
      payment.sender=user;
      if(payment.products){
        var productModel=ctx.Model.app.models.product;
        productModel.find({'_id': { $in: payment.products}},function(err,result){
          treatError(err,result);
          payment.products=result;
          console.log(payment)
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


};
