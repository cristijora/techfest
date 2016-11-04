'use strict';

module.exports = function(Mood) {
  Mood.observe('before save', function updateTimestamp(ctx, next) {
    console.log(Object.keys(ctx));
    console.log(ctx.options);
  /*  if (ctx.instance) {
      ctx.instance.updated = new Date();
    } else {
      ctx.data.updated = new Date();
    }*/
    next();
  });
};
