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
// var transm_ratio = 0
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    // io.sockets.emit('message', 'You are connected!');
    // io.sockets.emit('scroll', transm_ratio);
    fs.readFile('views/strap_small.html', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        io.sockets.emit('message', data); // send the text to the client side.

        var save_current_version = function(data){
          var date = new Date()
          var minute = date.getMinutes();
          var hour = date.getHours();
          var day = date.getDate();
          var month = date.getMonth();
          var year = date.getFullYear();
          var txt_date = [year, month, day, hour, minute].join('_')
          fs.writeFile("views/saved/strap_small" + '_old_' + txt_date + ".html", data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
          }); // end writeFile
        } // end save_current_version

        fs.readFile('views/scroll.json', 'utf8', function (err, ratio) {
            if (err) {
              return console.log(err);
            }
            console.log("ratio from readFile is : " + ratio);
            io.sockets.emit('scroll', ratio); // send the text to the client side.
        });

        setInterval(function(data) { // Save the current strap version.
                // Do something every 1 minute (60000 s)
                save_current_version(data)
          }, 60000);

    }); // end fs.readFile

    socket.on('join', function(data) {
        console.log('client sent a message... ' + data);
      }); // end socket.on join


    socket.on('return', function(data) {
        console.log('Retrieving the whole text modified... ' + data);
        fs.writeFile("views/strap_small.html", data, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was modified!");
        });
      }); // end socket.on return


      socket.on('scroll', function(ratio) {
          console.log('ratio is ... ' + ratio);
          fs.writeFile("views/scroll.json", ratio, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("saving scroll in json");
          }); // end writeFile
        }); // end socket.on scroll

}); // sockets.on connection

server.listen(3000);
