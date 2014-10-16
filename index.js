var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require('pi-gpio');

// Write is working!!!
//gpio.open(16, "output", function(err) {
//	gpio.setDirection(16, "output", function(err) {
//		gpio.write(16, 0, function(err) {
//			if(err) throw err;
//		});
//	});
//});

// Read is working!!!
//gpio.open(16, "output", function(err) {
//	gpio.read(16, function(err, value) {
//		if(err) throw err;
//		console.log(value);
//		gpio.close(16);
//	});
//});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('turn on control', function(msg){
		io.emit('turn on control', msg);
		console.log('Control has been turned ' + msg);
		
		//gpio.open(16, "output", function(err) {
			gpio.setDirection(16, "output", function(err) {
				gpio.write(16, 1, function(err) {
					if(err) throw err;
				});
			});
		//});
	});
	
	socket.on('turn off control', function(msg){
		io.emit('turn off control', msg);
		console.log('Control has been turned ' + msg);
		
		//gpio.open(16, "output", function(err) {
			gpio.setDirection(16, "output", function(err) {
				gpio.write(16, 0, function(err) {
					if(err) throw err;
				});
			});
		//});
	});

	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

