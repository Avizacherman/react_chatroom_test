
var express = require('express')
var router = express.Router();

var fs = require('fs')

router.get('/', function(req, res){
	res.set({
		'Content-Type': 'text/JSON'	
	})
	var chat = fs.readFile('./db/chatroom.json', 'utf8', function(err, data){
		res.send(data)
	})
})

router.post('/', function(req, res){
	fs.readFile('./db/chatroom.json', 'utf8', function(err, data){
		var chatObj = JSON.parse(data)
		var newLine = req.body
		chatObj.push(newLine)



		var chatJSON = JSON.stringify(chatObj)
		console.log(newLine)
	fs.writeFile('./db/chatroom.json', chatJSON, function(err){
		if(err) {
			console.log(err)
			res.sendStatus(500)
		} else {
				res.set({
					'Content-Type': 'text/JSON'
				})
			res.send(chatJSON)
		}
	} )
})
})

module.exports = router;
