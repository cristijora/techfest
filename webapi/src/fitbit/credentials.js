/**
 * Created by cristian.jora on 12.10.2016.
 */
var clientSecret='8ad77a334f6e3582f4c67357618a50de';
var clientId='22825F';
var auth_token=new Buffer(`${clientId}:${clientSecret}`).toString('base64');

module.exports=auth_token;