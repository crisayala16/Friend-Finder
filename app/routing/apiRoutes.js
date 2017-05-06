var express = require('express');
var apiRouter = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var data = require('./../data/friends.js');

//Displays all friends in json format
apiRouter.get('/api/friends', function(req, res){
	res.send(data);
});

//Listening for post request from client
apiRouter.post('/api/friends', function(req, res){
	//Getting the specific info from client
	var newFriend = req.body;
	var friendDifferences = [];
	var match;
	//Loops over every friend
	for(var i = 0; i < data.length; i++){
		var currentDataScore = data[i].scores;
		var newFriendScore = newFriend.scores;
		var diffArr = [];
		var totalDiffernece = 0;
		//Loops over every value in the score list of the current friend
		for(var e = 0; e < currentDataScore.length; e++){
			var num1 = parseInt(currentDataScore[e]);
			var num2 = parseInt(newFriendScore[e]);
			//Conditionals that prevent negative numbers 
			if(num1 < num2 || num1 === num2){
				var diff = num2 - num1;
				diffArr.push(diff);
			}
			else if(num2 < num1){
				var diff = num1 - num2;
				diffArr.push(diff);	
			}
		}
		//Loops for every score difference, in order to calculate total difference
		for(var x = 0; x < diffArr.length; x++){
			totalDiffernece += diffArr[x];
		}
		//Adds current difference to an array
		friendDifferences.push(totalDiffernece);
	}
	//Finds the lowest differnece in the array
	//And uses the current index to get the friend that matches
	var lowDiff = Math.min.apply(Math, friendDifferences);
	for(var y = 0; y < friendDifferences.length; y++){
		if(friendDifferences[y] === lowDiff){
			match = data[y];
			//sends the match to the client
			res.send(match);
			data.push(newFriend);

		}
	}

});

module.exports = apiRouter;