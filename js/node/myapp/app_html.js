var express = require('express')
var path = require("path");
var fs = require('fs');

var app = express()
var server = require('http').createServer(app);

app.get('/',function(req,res){
      res.sendFile(path.join(__dirname+'/views/strap_small.html'));
  });

app.get('/text',function(req,res){
      res.sendFile(path.join(__dirname+'/views/text.html'));
  });

var w = false
var r = false

if (w == true){
    fs.writeFile("bingo.txt", "Hey there!", function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
    });
}

if (r == true){
	//fs.readFile('bingo.txt', 'utf8', function (err,data) {
	fs.readFile('views/strap_small.html', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  console.log(data);
	});
}

// Loading socket.io
var io = require('socket.io')(server);
// When a client connects, we note it in the consol
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    // io.sockets.emit('message', 'You are connected!');
    fs.readFile('views/strap_small.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        io.sockets.emit('message', data); // send the text to the client side.
    });
}); // sockets.on connection

io.sockets.on('join', function() {
    console.log('client sent a message... ');
  }); // end socket.on join

server.listen(3000);
