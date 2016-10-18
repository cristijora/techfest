var morgan =require('morgan');
var fs = require('fs')
var path = require('path')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

var logger=morgan('combined',{         //logger options
    stream: accessLogStream  //write logs to file
})

module.exports=logger;