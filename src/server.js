/*var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});*/



//Install express server
const express = require('express');
// Requirement of path Module in order to manage URLS
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/reacttour'));
app.get('/*', function(req,res) {
   res.sendFile(path.join(__dirname+'/dist/reacttour/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);