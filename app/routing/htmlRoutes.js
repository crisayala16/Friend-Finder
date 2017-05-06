var express = require('express');
var htmlRouter = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

htmlRouter.use(express.static(path.join(__dirname, '/../public/')));

htmlRouter.get("/survey", function(req, res){
	res.sendFile(path.join(__dirname, '/../public/survey.html'));
});;

module.exports = htmlRouter;