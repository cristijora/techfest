'use strict';
module.exports = function (Customer) {

  Customer.afterRemote('login', function (ctx, result, next) {
    result.lastPayments = [];
    var paymentModel = Customer.app.models.payment;
    paymentModel.find({
      order:'date DESC',
      where: {senderId: result.userId},
      limit:3,
      }, function (err, payments) {
      if(err || result==null || result==undefined){
        treatError(err);
      }
      result.lastPayments=payments;
      next();
    })

    function treatError(err,result) {
      if (err) {
        return next(getError(err));
      }
      if(!result){
        return next(getError("Could find one or more entities"))
      }
    }

  });
  Customer.afterRemote('findById', function(ctx,result,next){
    var challengeModel = Customer.app.models.challenge;
    console.log(result);
    result.challenges=[];
    challengeModel.find({where:{userId:ctx.id}},function(err,challenges){
      if(err || result==null || result==undefined){
        treatError(err);
      }
      result.challenges=challenges;
      next();
    })

    function treatError(err,result) {
      if (err) {
        return next(getError(err));
      }
      if(!result || result==null){
        return next(getError("Could find one or more entities"))
      }
    }
  });
  function getError(message) {
    var err=new Error(message);
    err.status=400;
    return err;
  }
}
