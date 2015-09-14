var express = require('express')
var router = express.Router();

var fs = require('fs')

router.get('/', function(req, res){
	res.set({
		'Content-Type': 'text/JSON'	
	})
	var JSON = fs.readFile('./db/chatroom.json', 'utf8', function(err, data){
		res.send(data)
	})
})

module.exports = router;
