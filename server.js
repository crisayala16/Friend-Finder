var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = 3050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));
//Allows page access to external css files
app.use(express.static(path.join(__dirname, '/app/public/css/')));
//Html routes
app.use(require('./app/routing/htmlRoutes.js'));
//API routes
app.use(require('./app/routing/apiRoutes.js'));

app.listen(port, function(){
	console.log('listening on port' + port);
});