/**
 * Created by User on 12.11.2016.
 */
// server.js
'use strict'
// Define global Vue for server-side app.js
global.Vue = require('vue')
// Get the HTML layout
var renderer = require('vue-server-renderer').createRenderer()
// Create an express server
function getHtml(user,cb){
  console.log(user);
 renderer.renderToString(
    // Create an app instance
    require('./app')(user),
    // Handle the rendered result
    function (error, html) {
      // If an error occurred while rendering...
      if (error) {
        // Log the error in the console
        console.error(error)
        // Tell the client something went wrong
        cb(error);
      }
      // Send the layout with the rendered app's HTML
      cb(html);
    }
  )
}
module.exports=getHtml;


var mail=''
